'use strict';

const packageJson = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run(onComplite) {
    console.info(chalk.blue(packageJson.version));
    onComplite(true);
  }
};
