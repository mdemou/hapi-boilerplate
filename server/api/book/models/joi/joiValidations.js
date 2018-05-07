'use strict';


let joiErrors;


exports.getJoiError = function (key, valid) {
  return joiErrors[key].message + (valid || '') + '||' + joiErrors[key].code;
};

joiErrors = {
  uuid: {
    code: '40002',
    message: 'uuid must be a valid uuid'
  },
  author: {
    code: '40003',
    message: 'author must be a valid string'
  },

};

exports.joiErrors = joiErrors;