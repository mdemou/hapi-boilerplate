'use strict';

function makeService(deps) {
  const {
    bookController
  } = deps;

  const routes = [
    {
      method: 'GET',
      path: '/',
      handler: bookController.getLastBooks
    },
    {
      method: 'POST',
      path: '/',
      handler: bookController.createBook
    },
    {
      method: 'GET',
      path: '/{id}',
      handler: bookController.getBook
    }, 
    {
      method: 'DELETE',
      path: '/{id}',
      handler: bookController.deleteBook
    }
  ];

  return (server) => {
    routes.forEach((route) => {
      server.route(route);
    });
  };
}


module.exports = makeService;
