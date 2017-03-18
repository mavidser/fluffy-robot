'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class SendGrid extends EmailServiceProvider {

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
