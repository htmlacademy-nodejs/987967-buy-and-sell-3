'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {createAPI} = require(`../api`);
const {ExitCode, HttpStatusCode, HttpStatusInfo, API_PREFIX} = require(`../const`);

const DEFAULT_PORT = 3000;

const createApp = async () => {
  const app = express();
  const apiRouter = await createAPI();

  app.use(express.json());
  app.use(API_PREFIX, apiRouter);

  app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND));

  app.use((err, req, res, next) => {
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

      console.info(chalk.green(`Listening port ${port}...`));
    });
  } catch (err) {
    console.error(chalk.red(`Error creating server: "${err}"`));
    process.exit(ExitCode.ERROR);
  }

  return ExitCode.WORKING;
};


module.exports = {
  name: `--server`,
  run,
  createServer: createApp,
};
