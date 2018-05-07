'use strict';


const Joi = require('joi');
const joiVals = require('./joiValidations');


function BookCreateJoi() {
  return Joi.object().keys({
    author: Joi.string()
      .min(1)
      .max(255)
      .label(joiVals.getJoiError('author'))
      .required(),
  }).unknown();
}

module.exports = BookCreateJoi;
