'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const apiRouter = require(`../api`);
const {ExitCode, HttpStatusCode, HttpStatusInfo, API_PREFIX} = require(`../const`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, apiRouter);

app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND));

app.use((err, req, res, next) => {
  res.status(HttpStatusCode.SERVER_ERROR).send(`${HttpStatusInfo.SERVER_ERROR}: ${err}`);
  next();
});

module.exports = {
  name: `--server`,
  run(portName) {
    const port = parseInt(portName, 10) || DEFAULT_PORT;

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
  },
  server: app,
};
