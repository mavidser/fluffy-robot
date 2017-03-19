'use strict';

const autoBind = require('auto-bind');
const EmailServiceError = require('./email-service-error');
const EmailServiceProvider = require('./email-service-provider');

class EmailService {

  /**
   * Create an EmailService instance which tries uses a set of providers to send an Email, one by one, given that the previous one fails..
   * @param {EmailServiceProvider[]} providers - An array of email service providers to be used in the given order.
   * @param {Object} options - Additional configuration options
   * @param {boolean} options.logging - Enable error logging or not
   */
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

  /**
   * Function to send an email using the initialized providers.
   * @param {Object} details - Email message options
   * @param {string} details.from - The email address of the sender
   * @param {string|string[]} details.to - Comma separated list or an array of recipients email addresses that will appear on the To: field
   * @param {string|string[]} [details.cc] - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
   * @param {string|string[]} [details.bcc] - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
   * @param {string} [details.subj] - The subject of the email
   * @param {string} [details.text] - The plaintext version of the message
   * @param {string} [details.html] - he HTML version of the message
   * @return {Promise.<{result: Object, errors: EmailServiceError[]}>} - A promise for sending the Email.
   * @reject {EmailServiceError[]} - Array of EmailService errors which might have occurred.
   */
  sendEmail(details) {
    let sendEmailFailsafe = (index, resolve, reject, errors) => {
      return this.providers[index].sendEmail(details)
        .then(res => {
          return resolve({
            result: res,
            errors: errors
          });
        })
        .catch(err => {
          if (this.logging === true) {
            console.error(`ERR ${this.providers[index].transporter.options.auth.user}@${this.providers[index].constructor.name}: ${err.message}`);
          }
          errors.push(err);
          if (++index === this.providers.length) {
            return reject(errors);
          }
          return sendEmailFailsafe(index, resolve, reject, errors);
        })
        .catch(reject);
    };

    return new Promise((resolve, reject) => {
      return sendEmailFailsafe(0, resolve, reject, []);
    });
  }

}

module.exports = EmailService;
