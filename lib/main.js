'use strict';

module.exports = {
  EmailServiceConfig: require('./email-service-config'),
  EmailService: require('./email-service'),
  SendGrid: require('./sendgrid'),
  Mailgun: require('./mailgun'),
  Mandrill: require('./mandrill'),
  SES: require('./ses')
};
