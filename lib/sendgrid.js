'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class SendGrid extends EmailServiceProvider {

  /**
   * Create a SendGrid provider.
   * @extends EmailServiceProvider
   * @param {string} username - SMTP username for SendGrid.
   * @param {string} password - SMTP password for SendGrid.
   */
  constructor(username, password) {
    const config = {};
    config.host = 'smtp.sendgrid.net';
    config.port = 25;
    config.secure = false;
    config.user = username;
    config.pass = password;
    super(config);
    autoBind(this);
  }

}

module.exports = SendGrid;
