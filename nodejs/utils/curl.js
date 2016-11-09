const exec = require('child_process').exec;


/*
* Wrap curl for Unix socket calls
*
* curl --unix-socket /var/run/docker.sock http:/containers/json
*
* Optionally, user can pass in another socket address.
* */

// TODO: Check for version of curl. Must be 7.4 or greater


const dockerDefaultSocket = '/var/run/docker.sock';
const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';

const curl = (socket) => {

  const dockerSocket = socket || dockerDefaultSocket;

  //curl -X GET --unix-socket /var/run/docker.sock http:/images/json

  const getCurlCommand = (method, endpoint) => {

    //TODO: Fix extra slashes!!!
    return `curl -X ${method} --unix-socket ${dockerSocket} http:/${endpoint}`;
  }


  const get = (endpoint, cb, errCb) => {
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
