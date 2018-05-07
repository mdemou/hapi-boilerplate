'use strict';

class DBError extends Error {

  constructor(error) {
    super();
    Object.assign(this, error);
  }

}

module.exports = DBError;