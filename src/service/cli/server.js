'use strict';

const chalk = require(`chalk`);
const { createServer } = require(`http`);
const { ExitCode } = require(`../const`);

const DEFAULT_PORT = 3000;

const onClientConnect = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!!!');
}

module.exports = {
  name: `--server`,
  run(portName) {
    const port = Number.parseInt(portName, 10) || DEFAULT_PORT;

    createServer(onClientConnect).listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Error creating server: "${err}"`));
        return ExitCode.ERROR
      };

      console.info(chalk.green(`Listening port ${port}...`));
    });

    return ExitCode.WORKING
  }
};
