'use strict';

const autoBind = require('auto-bind');
const EmailServiceError = require('./email-service-error');
const EmailServiceProvider = require('./email-service-provider');

class EmailService {

  constructor(providers, options) {
    if (Array.isArray(providers) && providers.length > 0 && providers.every(item => item instanceof EmailServiceProvider)) {
      this.providers = providers;
    } else {
      throw new EmailServiceError('Argument must be an array of EmailServiceProvider instances');
    }
    if (options !== null && typeof options === 'object') {
      this.logging = options.logging || false;
    }
    autoBind(this);
  }

  sendEmail(details) {
    return new Promise((resolve, reject) => {
      return this._sendEmail(this.providers, 0, details, resolve, reject, []);
    });
  }

  _sendEmail(providers, index, details, resolve, reject, errors) {
    return providers[index].sendEmail(details)
      .then(res => {
        return resolve({
          result: res,
          errors: errors
        });
      })
      .catch(err => {
        if (this.logging === true) {
          console.error(`ERR ${providers[index].transporter.options.auth.user}@${providers[index].constructor.name}: ${err.message}`);
        }
        errors.push(err);
        if (++index === providers.length) {
          return reject(errors);
        }
        return this._sendEmail(providers, index, details, resolve, reject, errors);
      })
      .catch(reject);
  }
}

module.exports = EmailService;
