'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class Mailgun extends EmailServiceProvider {

  constructor() {
    super();
    autoBind(this);
  }

}

module.exports = Mailgun;
