'use strict';

const autoBind = require('auto-bind');
const nodemailer = require('nodemailer');

class EmailServiceProvider {

  constructor(config) {
    if (!config.user) {
      throw new Error('Username is required for authentication.');
    }
    if (!config.pass) {
      throw new Error('Password is required for authentication.');
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
      throw new Error('No argument found in the sendEmail function.');
    }
    if (!(typeof details.from === 'string' || details.from instanceof String)) {
      throw new Error('\'from\' string is required in the details argument.');
    }
    if (!(typeof details.to === 'string' || details.to instanceof String || Array.isArray(details.to))) {
      throw new Error('\'to\' array/string is required in the details argument.');
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
