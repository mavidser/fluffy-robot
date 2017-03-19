'use strict';

const autoBind = require('auto-bind');

class EmailServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailServiceError';
    autoBind(this);
  }
}

module.exports = EmailServiceError;
