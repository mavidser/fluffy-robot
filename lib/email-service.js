'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class EmailService {

  constructor(providers) {
    if (Array.isArray(providers) && providers.every(item => item instanceof EmailServiceProvider)) {
      this.providers = providers;
    } else {
      throw new Error('argument must be an array of EmailServiceProvider instances');
    }
    autoBind(this);
  }

  sendEmail() {
    return new Promise(resolve => {
      return resolve();
    });
  }
}

module.exports = EmailService;
