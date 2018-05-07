'use strict';

var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  host: process.env.HOST || process.env.HOSTNAME || 'localhost',
  appName: 'boilerplate:book',

  env: process.env.BOILERPLATE_NODE_ENV,

  routes: {
    prefix: '/v1/book'
  },

  book: {
    maxEntriesLimit: 10
  }
};

// Export the config object based on the BOILERPLATE_NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.BOILERPLATE_NODE_ENV) || {});
