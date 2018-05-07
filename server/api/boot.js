'use strict';


const {createContainer, asValue, asFunction, asClass} = require('awilix');
const container = createContainer();

// Init
const makeAppInit = require('./../init');
const app = require('./../app');
const config = require('./../config/environment');
const apiRoutes = require('./../routes');

// Libraries
const mongodb = require('mongodb');
const Hapi = require('hapi');

// Services
const ErrorService = require('./services/errors.service');
const ResponsesService = require('./services/responses.service');
const SchemaService = require('./services/schema.service');
const GlobalService = require('./services/global.service');
const LoggingService = require('./services/logging.service');

// book entity
const makeBookController = require('./book/book.controller');
const makeBookService = require('./book/book.service');
const makeBookResponses = require('./book/book.responses');
const BookEntity = require('./book/book.entity');
const BookDAO = require('./book/book.DAO');
const bookRouter = require('./book/routes');


container.register({
  // Libs
  mongodb: asValue(mongodb),
  Hapi: asValue(Hapi),
  config: asValue(config),

  // Initial
  appInit: asFunction(makeAppInit).singleton(),
  app: asFunction(app).singleton(),
  apiRoutes: asFunction(apiRoutes).singleton(),

  // services
  loggingService: asFunction(() => LoggingService).singleton(),
  errorService: asFunction(() => ErrorService).singleton(),
  responsesService: asFunction(() => ResponsesService).singleton(),
  schemaService: asFunction(() => SchemaService).singleton(),
  GlobalService: asFunction(() => GlobalService).singleton(),

  // book entity
  bookController: asFunction(makeBookController).singleton(),
  bookService: asFunction(makeBookService).singleton(),
  bookResponses: asFunction(makeBookResponses).singleton(),
  BookEntity: asFunction((opts) => () => new BookEntity(opts)).singleton(),
  BookDAO: asFunction((opts) => () => new BookDAO(opts)).singleton(),
  bookRouter: asFunction(bookRouter).singleton(),

});

function instantiateEntityWithDependencies(entity) {
  return (deps) => (...args) => new entity(deps, ...args);
}

module.exports = container;
