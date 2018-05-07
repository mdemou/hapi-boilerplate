'use strict';

function appInit(deps) {
  const {
    mongodb,
    GlobalService,
    loggingService,
    app,
    config,
  } = deps;

  app().then((server) => {
    let url = config.mongoUrl;
    const MongoClient = mongodb.MongoClient;
    MongoClient.connect(url, function (err, client) {
      if (err) {
        loggingService.warn(__filename, 'init', 'Impossible to connect to MongoDDBB');
        return;
      }
      loggingService.info(__filename, 'init', 'Connected successfully to MongoDDBB');
      const db = client.db(config.mongoDdbb);
      GlobalService.setConfigValue('db', db);
    });
    loggingService.info(__filename, 'init', 'Server running at ' + server.info.uri);
  }, err => {
    loggingService.error(__filename, 'init', 'Server start error ' + err);
  });
}

module.exports = appInit;
