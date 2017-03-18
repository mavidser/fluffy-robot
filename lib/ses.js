'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class SES extends EmailServiceProvider {

  constructor() {
    super();
    autoBind(this);
  }

}

module.exports = SES;
