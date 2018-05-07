'use strict';

const pino = require('pino')();
/* Error levels
Info: level 30
Warn: level 40
Error: level 50
Fatal: level 60
*/

exports.debug = function (fileName, methodName, logItem) {
  pino.debug(formatResponse(fileName, methodName), JSON.stringify(logItem));
};

exports.info = function (fileName, methodName, logItem) { 
  pino.info(formatResponse(fileName, methodName), JSON.stringify(logItem));
};

exports.warn = function (fileName, methodName, logItem) {
  pino.warn(formatResponse(fileName, methodName), JSON.stringify(logItem));
};

exports.error = function (fileName, methodName, logItem) {
  pino.error(formatResponse(fileName, methodName), JSON.stringify(logItem));
};

exports.fatal = function (fileName, methodName, logItem) { 
  pino.fatal(formatResponse(fileName, methodName), JSON.stringify(logItem));
};

function formatResponse(fileName, methodName) {
  return {
    filename: fileName.slice(fileName.lastIndexOf('/') + 1, -3),
    methodName: methodName,
    date: new Date()
  };
}
