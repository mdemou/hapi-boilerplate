'use strict';

// Development specific configuration
// ==================================
module.exports = {
  ip: process.env.BOOK_IP,
  port: parseInt(process.env.BOOK_PORT),
  mongoUrl: process.env.BOOK_MONGOURL,
  mongoDdbb: process.env.BOOK_MONGODDBB,

  routes: {
    prefix: '/v1/book'
  },

  defaults: {
    mongo: {
      limit: parseInt(process.env.BOOK_MONGO_LIMIT)
    }
  },

  book: {
    maxEntriesLimit: parseInt(process.env.BOOK_MAX_ENTRIES_LIMIT)
  }
};
