'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class Mailgun extends EmailServiceProvider {

  /**
   * Create a Mailgun provider.
   * @extends EmailServiceProvider
   * @param {string} username - SMTP username for Mailgun.
   * @param {string} password - SMTP password for Mailgun.
   */
  constructor(username, password) {
    const config = {};
    config.host = 'smtp.mailgun.org';
    config.port = 25;
    config.secure = false;
    config.user = username;
    config.pass = password;
    super(config);
    autoBind(this);
  }

}

module.exports = Mailgun;
