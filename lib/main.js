'use strict';

/**
 * @module ES
 */
module.exports = {
  /** @type EmailServiceError */
  EmailServiceError: require('./email-service-error'),
  /** @type EmailService */
  EmailService: require('./email-service'),
  /** @type SendGrid */
  SendGrid: require('./sendgrid'),
  /** @type Mailgun */
  Mailgun: require('./mailgun'),
  /** @type Mandrill */
  Mandrill: require('./mandrill'),
  /** @type SES */
  SES: require('./ses')
};
