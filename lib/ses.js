'use strict';

const autoBind = require('auto-bind');
const EmailServiceProvider = require('./email-service-provider');

class SES extends EmailServiceProvider {

  /**
   * Create an SES provider.
   * @extends EmailServiceProvider
   * @param {string} username - SMTP username for SES.
   * @param {string} password - SMTP password for SES.
   * @param {string} region - Region of the AWS account.
   */
  constructor(username, password, region) {
    if (!(typeof region === 'string' || region instanceof String)) {
      throw new Error('A supported region is needed to connect with AWS.');
    }
    const config = {};
    config.host = `email-smtp.${region}.amazonaws.com`;
    config.port = 25;
    config.secure = false;
    config.user = username;
    config.pass = password;
    super(config);
    autoBind(this);
  }

}

module.exports = SES;
