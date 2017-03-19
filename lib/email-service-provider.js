'use strict';

const autoBind = require('auto-bind');
const nodemailer = require('nodemailer');
const EmailServiceError = require('./email-service-error');

class EmailServiceProvider {

  /**
   * EmailServiceProvider constructor to configure the SMTP connection.
   * @private
   * @param {Object} config - Configuration for the nodemailer transporter object
   * @param {string} config.user - SMTP username
   * @param {string} config.pass - SMTP password
   * @param {string} config.host - SMTP hostname
   * @param {number} config.port - SMTP port
   * @param {boolean} config.secure - true if using TLS
   */
  constructor(config) {
    if (!config.user) {
      throw new EmailServiceError('Username is required for authentication.');
    }
    if (!config.pass) {
      throw new EmailServiceError('Password is required for authentication.');
    }
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
    autoBind(this);
  }

  /**
   * Function to send an email.
   * @param {Object} details - Email message options
   * @param {string} details.from - The email address of the sender
   * @param {string|string[]} details.to - Comma separated list or an array of recipients email addresses that will appear on the To: field
   * @param {string|string[]} [details.cc] - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
   * @param {string|string[]} [details.bcc] - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
   * @param {string} [details.subj] - The subject of the email
   * @param {string} [details.text] - The plaintext version of the message
   * @param {string} [details.html] - The HTML version of the message
   * @return {Promise.<{result: Object, errors: EmailServiceError[]}>} - A promise for sending the Email.
   * @reject {EmailServiceError} - EmailService Error which occurred..
   */
  sendEmail(details) {
    if (!(details === null || typeof details === 'object')) {
      throw new EmailServiceError('No argument found in the sendEmail function.');
    }
    if (!(typeof details.from === 'string' || details.from instanceof String)) {
      throw new EmailServiceError('\'from\' string is required in the details argument.');
    }
    if (!(typeof details.to === 'string' || details.to instanceof String || Array.isArray(details.to))) {
      throw new EmailServiceError('\'to\' array/string is required in the details argument.');
    }
    return this.transporter.sendMail({
      from: details.from,
      to: details.to,
      cc: details.cc,
      bcc: details.bcc,
      subject: details.subject,
      text: details.text,
      html: details.html
    })
    .catch(err => {
      throw new EmailServiceError(err.message);
    });
  }

}

module.exports = EmailServiceProvider;
