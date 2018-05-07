'use strict';

exports.createGeneralError = function (err) {

  return {
    statusCode: err.statusCode || 500,
    body: {
      result: {
        code      : err.code || '50000',
        message   : err.message
      }
    }
  };
};