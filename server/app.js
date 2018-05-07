/**
 * Main application file
 */
'use strict';

function makeService(deps) {
  const {
    Hapi,
    config, 
    apiRoutes,
    loggingService
  } = deps;

  const plugins = [{
    plugin: apiRoutes,
  }];

  const options = {
    routes: {
      prefix: config.routes.prefix
    }
  };

  return async () => {
    try {
      const server = Hapi.server({
        port: config.port,
        host: config.ip,
        routes: {
          cors: {
            origin: ['*']
          }
        }
      });
      await server.register(plugins, options);
      await server.start();
      return server;
    } catch (e) {
      loggingService.info(__filename, 'Init Server Failed: ', e);
    }
  };
}

module.exports = makeService;
