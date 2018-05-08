'use strict';

require('dotenv').config();

const {createContainer, asValue, asFunction, asClass} = require('awilix');
const container = createContainer();

// Init
const makeAppInit = require('./../init');
const app = require('./../app');
const config = require('./../config');
const apiRoutes = require('./../routes');

// Libraries
const mongodb = require('mongodb');
const Hapi = require('hapi');
const Joi = require('joi');
const _ = require('lodash');
const pino = require('pino')();
const uuidv4 = require('uuid/v4');

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
const bookRouter = require('./book/routes');
const bookDAO = require('./book/book.DAO');


container.register({
  // Libs
  mongodb: asValue(mongodb),
  Hapi: asValue(Hapi),
  Joi: asValue(Joi),
  pino: asValue(pino),
  _: asValue(_),
  config: asValue(config),
  uuidv4: asValue(uuidv4),

  // Initial
  appInit: asFunction(makeAppInit).singleton(),
  app: asFunction(app).singleton(),
  apiRoutes: asFunction(apiRoutes).singleton(),

  // services
  loggingService: asFunction(LoggingService).singleton(),
  errorService: asValue(ErrorService),
  responsesService: asValue(ResponsesService),
  schemaService: asFunction(SchemaService).singleton(),
  GlobalService: asValue(GlobalService),

  // book entity
  bookController: asFunction(makeBookController).singleton(),
  bookService: asFunction(makeBookService).singleton(),
  bookResponses: asFunction(makeBookResponses).singleton(),
  bookRouter: asFunction(bookRouter).singleton(),
  bookDAO: asClass(bookDAO).singleton(),

});

function instantiateEntityWithDependencies(entity) {
  return (deps) => (...args) => new entity(deps, ...args);
}

module.exports = container;
