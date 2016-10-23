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
const GET = 'XGET';
const PUT = 'XPUT';
const POST = 'XPOST';

const curl = (socket) => {

  const dockerSocket = socket || dockerDefaultSocket;

  const getCurlCommand = (method, endpoint) => {
    return `curl --unix-socket -{method} {dockerSocket} {endpoint}`;
  }


  const get = (endpoint) => {
    const curlCommand = getCurlCommand(GET, endpoint);
    exec(curlCommand + endpoint, execCallback);
  }

  const post = (endpoint) => {
    const curlCommand = getCurlCommand(POST, endpoint);
    exec(curlCommand + endpoint, execCallback);
  }

  const put = (endpoint) => {
    const curlCommand = getCurlCommand(PUT, endpoint);
    exec(curlCommand + endpoint, execCallback);
  }

  const execCallback = (error, stdout, stderr) => {

  }

  return {
    get,
    post,
    put
  }
}

module.exports = curl;
