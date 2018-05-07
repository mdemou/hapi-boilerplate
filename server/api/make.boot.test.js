'use strict';


// Init
const AppInit = require('./../init');

// Libraries

// Services
const ErrorService = require('./services/errors.service');
const ResponsesService = require('./services/responses.service');
const SchemaService = require('./services/schema.service');

// user entity
const makeUserController = require('./user/user.controller');
const makeUserService = require('./user/user.service');
const makeUserResponses = require('./user/user.responses');
const UserEntity = require('./user/user.entity');

const { createContainer, asValue, asFunction, asClass } = require('awilix');

function makeBoot() {
  const container = createContainer();
  container.register({
    // Libs

    // Initial
    appInit: asFunction(() => (...args) => AppInit(...args)).singleton(),

    // config

    // services
    errorService: asFunction(() => ErrorService).singleton(),
    responsesService: asFunction(() => ResponsesService).singleton(),
    schemaService: asFunction(() => SchemaService).singleton(),

    // user entity
    userController: asFunction(makeUserController).singleton(),
    userService: asFunction(makeUserService).singleton(),
    userResponses: asFunction(makeUserResponses).singleton(),
    UserEntity: asFunction((opts) => () => new UserEntity(opts)).singleton(),

  });

  return container;
}

module.exports = makeBoot;
