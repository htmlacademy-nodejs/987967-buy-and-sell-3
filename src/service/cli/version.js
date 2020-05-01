'use strict';

const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run(onComplite) {
    console.info(packageJson.version);
    onComplite(true);
  }
};
