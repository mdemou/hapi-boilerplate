'use strict';

function  makeService(deps) {
  const {
    pino
  } = deps;

  function formatResponse(fileName, methodName) {
    return {
      filename: fileName.slice(fileName.lastIndexOf('/') + 1, -3),
      methodName: methodName,
      date: new Date()
    };
  }

  return {
    debug: (fileName, methodName, logItem) => {
      pino.debug(formatResponse(fileName, methodName), JSON.stringify(logItem));
    },

    info: (fileName, methodName, logItem) => {
      pino.info(formatResponse(fileName, methodName), JSON.stringify(logItem));
    },

    warn: (fileName, methodName, logItem) => {
      pino.warn(formatResponse(fileName, methodName), JSON.stringify(logItem));
    },

    error: (fileName, methodName, logItem) => {
      pino.error(formatResponse(fileName, methodName), JSON.stringify(logItem));
    },

    fatal: (fileName, methodName, logItem) => {
      pino.fatal(formatResponse(fileName, methodName), JSON.stringify(logItem));
    },
  };
}

module.exports = makeService;
