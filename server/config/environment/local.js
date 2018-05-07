'use strict';

// Development specific configuration
// ==================================
module.exports = {
  ip: 'localhost',
  port: 9000,
  mongoUrl: 'mongodb://localhost:27020',
  mongoDdbb: 'Books',

  defaults: {
    mongo: {
      limit: 50
    }
  },

  blog: {
    maxEntriesLimit: 10
  }
};
