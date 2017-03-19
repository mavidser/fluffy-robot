'use strict';

const autoBind = require('auto-bind');

class EmailServiceError extends Error {

  /**
   * Custom error class for identifying module errors.
   * @param {string} message - The Error message
   */
  constructor(message) {
    super(message);
    this.name = 'EmailServiceError';
    autoBind(this);
  }
}

module.exports = EmailServiceError;
