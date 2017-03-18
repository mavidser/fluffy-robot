'use strict';

const autoBind = require('auto-bind');
const EmailServiceConfig = require('./email-service-config');
const EmailServiceProvider = require('./email-service-provider');

class EmailService {
  constructor(config) {
    if (config !== undefined) {
      if (config instanceof EmailServiceConfig) {
        if (Array.isArray(config.providers) && !config.providers.every(item => item instanceof EmailServiceProvider)) {
          throw new Error('EmailServiceConfig doesn\'t contain any EmailServiceProviders');
        } else {
          this.providers = config.providers;
        }
      } else {
        throw new Error('The argument object must be an instance of EmailServiceConfig');
      }
    }
    autoBind(this);
  }

  sendEmail(options, providers) {
    if (this.providers === undefined && providers === undefined) {
      throw new Error('providers argument needed if EmailService not instantiated with EmailServiceConfig');
    }
    providers = providers || this.providers;
    if (!Array.isArray(providers)) {
      providers = [providers];
    }
    if (!providers.every(item => item instanceof EmailServiceProvider)) {
      throw new Error('Unsupported EmailServiceProvider');
    }
    return new Promise(resolve => {
      resolve();
    });
  }
}

module.exports = EmailService;
