'use strict';

const config = {};

exports.getConfigValue = function(param) {
  if(config[param]){
    return config[param];
  }
};

exports.setConfigValue = function(param, value) {
  config[param] = value;
  return config[param];
};

exports.getConfigList = function() {
  return config;
};