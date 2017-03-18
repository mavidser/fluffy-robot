'use strict';

const autoBind = require('auto-bind');
const SendGrid = require('./sendgrid');
const Mailgun = require('./mailgun');
const Mandrill = require('./mandrill');
const SES = require('./ses');

class EmailServiceConfig {
  constructor() {
    this.providers = [];
    autoBind(this);
  }

  addSendGrid(config) {
    this.providers.push(new SendGrid(config));
    return this;
  }

  addMailgun(config) {
    this.providers.push(new Mailgun(config));
    return this;
  }

  addMandrill(config) {
    this.providers.push(new Mandrill(config));
    return this;
  }

  addSES(config) {
    this.providers.push(new SES(config));
    return this;
  }
}

module.exports = EmailServiceConfig;
