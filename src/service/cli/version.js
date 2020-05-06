'use strict';

const packageJson = require(`../../../package.json`);
const chalk = require(`chalk`);
const { ExitCode } = require(`../const`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJson.version));

    return ExitCode.SUCCESS
  }
};
