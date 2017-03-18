'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class Mandrill extends EmailServiceProvider {

  constructor(username, password) {
    const config = {};
    config.host = 'smtp.mandrillapp.com';
    config.port = 587;
    config.secure = false;
    config.user = username;
    config.pass = password;
    super(config);
    autoBind(this);
  }

}

module.exports = Mandrill;
