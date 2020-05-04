'use strict';

const chalk = require(`chalk`);

const MESSAGE = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service <command>
    
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json`;

module.exports = {
  name: `--help`,
  run(onComplite) {
    console.info(chalk.grey(MESSAGE));

    onComplite(true);
  }
};
