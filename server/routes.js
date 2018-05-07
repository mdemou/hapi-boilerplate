/**
 * Main application routes
 */

'use strict';

function makeService(deps) {
  const {
    bookRouter
  } = deps;

  return {
    name: 'Router',
    register: bookRouter
  };
}

module.exports = makeService;

