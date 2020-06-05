'use strict';

const express = require(`express`);
const {createAPI} = require(`../api`);
const {ExitCode, HttpStatusCode, HttpStatusInfo, API_PREFIX, LoggerName} = require(`../const`);
const {logger, getLogger, LogMessage} = require(`../logger`);

const DEFAULT_PORT = 3000;
const apiLogger = getLogger({name: LoggerName.API});

const createApp = async () => {
  const app = express();
  const apiRouter = await createAPI();

  app.use(express.json());
  app.use((req, res, next) => {
    apiLogger.debug(LogMessage.getStartRequest(req.originalUrl));
    next();
  });
  app.use(API_PREFIX, apiRouter);

  app.use((req, res) => {
    apiLogger.error(LogMessage.getUnknownRoute(req.originalUrl));
    res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND);
  });

  app.use((err, req, res, next) => {
    logger.error(LogMessage.getError(err));
    res.status(HttpStatusCode.SERVER_ERROR).send(`${HttpStatusInfo.SERVER_ERROR}: ${err}`);
    next();
  });

  return app;
};

const run = async (portName) => {
  const port = parseInt(portName, 10) || DEFAULT_PORT;
  const app = await createApp();

  try {
    app.listen(port, (err) => {
      if (err) {
        throw new Error(err);
      }

      logger.info(LogMessage.getCreateServer(port));
    });
  } catch (err) {
    logger.error(LogMessage.getErrorCreatingServer(err));
    process.exit(ExitCode.ERROR);
  }

  return ExitCode.WORKING;
};


module.exports = {
  name: `--server`,
  run,
  createServer: createApp,
};
