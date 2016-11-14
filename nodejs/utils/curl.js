const { exec, execSync } = require('child_process');
const http = require('http');
//const execSync = require('child_process').execSync;


/*
* Wrap curl for Unix socket calls
*
* curl --unix-socket /var/run/docker.sock http:/containers/json
*
* Optionally, user can pass in another socket address.
*
* For the case of Windows, this will have to be implemented differently.
* Rename will be in order also.
* */

// TODO: Check for version of curl. Must be 7.4 or greater
// TODO: Windows! Probably this will need to use tcp for communication.
// TODO: Remove extra curl output


const dockerDefaultSocket = '/var/run/docker.sock';
const dockerDefaultTcpAddress = 'http://localhost:2375';
const isWin = /^win/.test(process.platform);

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';

const canUseSocket = (dockerSocket) => {

  // Windows OS does not support sockets and does not have curl.
  if(isWin) {
    return false;
  }

  let socketAvailable = false;
  const command = `curl -s -X GET --unix-socket ${dockerSocket} http:/info`;
  try {
    execSync(command);
    socketAvailable = true;
  }catch (error) {
    console.log('Socket is not available. Using TCP.')
  }

  return socketAvailable;
};

const curl = (socket, host, port) => {

  const dockerSocket = socket || dockerDefaultSocket;
  const dockerTcp = `http://${host}:${port}` || dockerDefaultTcpAddress;

  let useTcp = !socket && host && port;

  if(!useTcp && !canUseSocket(dockerSocket)) {
    //Exception. We can not connect.
    console.error('Unable to connect to docker daemon. No socket or TCP connection provided.')
  }

  //curl -X GET --unix-socket /var/run/docker.sock http:/images/json

  const getCurlCommand = (method, endpoint) => {

    let command = `curl -s -X ${method} --unix-socket ${dockerSocket} http:/${endpoint}`;
    if (useTcp) {
      command = `curl -s -X ${method} ${dockerTcp}/${endpoint}`;
    }
    //TODO: Fix extra slashes!!!
    return command;
  };

  const get = (endpoint, cb, errCb) => {
    if(useTcp) {
      http.get({
        host: host,
        port: port,
        path: `/${endpoint}`
      }, (response) => {

        var body = '';
        response.on('data', function(d) {
          body += d;
        });

        response.on('end', function() {
          // Data reception is done, do whatever with it!
          var parsed = JSON.parse(body);
          cb(parsed);
        });
      });
    }
    else {
      const curlCommand = getCurlCommand(GET, endpoint);
      exec(curlCommand, (error, stdout, stderr) => {
        if(error) {
          errCb(error);
        }
        else {
          cb(JSON.parse(stdout));
        }
      });
    }
  };

  const post = (endpoint) => {
    const curlCommand = getCurlCommand(POST, endpoint);
    exec(curlCommand, execCallback);
  }

  const put = (endpoint) => {
    const curlCommand = getCurlCommand(PUT, endpoint);
    exec(curlCommand, execCallback);
  }

  const returnFunc = (result) => {
    return result;
  };

  const execCallback = (error, stdout, stderr) => {
     returnFunc(stdout);
  }

  return {
    get,
    post,
    put
  }
}

module.exports = curl;
