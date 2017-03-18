'use strict';

const autoBind = require('auto-bind');

class EmailServiceProvider {

  constructor() {
    this.port = 25;
    this.secure = false;
    autoBind(this);
  }

  sendEmail() {
    return new Promise(resolve => {
      return resolve();
    });
  }

}

module.exports = EmailServiceProvider;
