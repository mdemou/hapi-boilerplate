'use strict';

const Joi = require('joi');
const _ = require('lodash');

exports.validateSchema = function(payload, schema) {
  return new Promise((resolve, reject) => {
    Joi.validate(payload, schema, (err, val) => {
      if (err) {
        let customErr, error;
        if (err.details[0].context.label && err.details[0].context.label.indexOf('||') !== -1) {
          customErr = err.details[0].context.label.split('||');
          error = {
            message: customErr[0],
            code: customErr[1],
            statusCode: 400
          };
        } else {
          customErr = err.details[0].message;
          error = {
            message: _.replace(customErr, new RegExp('\"', 'g'), ''),
            code: '40001',
            statusCode: 400
          };
        }
        return reject(error);
      } else {
        return resolve(val);
      }
    });
  });
};