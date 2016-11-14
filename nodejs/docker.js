const curl = require('./utils/curl');
/*
Used to wrap Docker Remote API
 */

class Docker {
  constructor(socket, host, port) {
    this.curl = curl(socket, host, port);
  }


  get images() {
    return {
      getAll: (cb, errCb) => {
        this.curl.get('images/json', cb, errCb);
      },
    }
  }

  get info() {
    return {
      get: (cb, errCb) => {
        this.curl.get('info', cb, errCb);
      }
    }
  }
}

module.exports = Docker;