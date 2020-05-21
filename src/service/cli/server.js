'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {offersRouter} = require(`./routes/offers`);
const {ExitCode, HttpStatusCode, HttpStatusInfo} = require(`../const`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(portName) {
    const port = parseInt(portName, 10) || DEFAULT_PORT;

    const app = express();

    app.use(express.json());
    app.use(`/offers`, offersRouter);
    app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND));
    app.use((err, req, res, next) => {
      res.status(HttpStatusCode.SERVER_ERROR).send(HttpStatusInfo.SERVER_ERROR);
      next();
    });

    app.listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Error creating server: "${err}"`));
        process.exit(ExitCode.ERROR);
      }

      console.info(chalk.green(`Listening port ${port}...`));
    });

    return ExitCode.WORKING;
  }
};
