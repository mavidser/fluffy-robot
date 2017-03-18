'use strict';

module.exports = {
  EmailService: require('./email-service'),
  SendGrid: require('./sendgrid'),
  Mailgun: require('./mailgun'),
  Mandrill: require('./mandrill'),
  SES: require('./ses')
};
