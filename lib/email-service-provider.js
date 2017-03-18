'use strict';

const autoBind = require('auto-bind');

class EmailServiceProvider {

  constructor() {
    autoBind(this);
  }

}

module.exports = EmailServiceProvider;
