'use strict';

const autoBind = require('auto-bind');
const nodemailer = require('nodemailer');
const EmailServiceError = require('./email-service-error');

class EmailServiceProvider {

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
    });
  }

}

module.exports = EmailServiceProvider;
