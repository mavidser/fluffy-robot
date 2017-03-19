'use strict';

module.exports = {
  EmailServiceError: require('./email-service-error'),
  EmailService: require('./email-service'),
  SendGrid: require('./sendgrid'),
  Mailgun: require('./mailgun'),
  Mandrill: require('./mandrill'),
  SES: require('./ses')
};
