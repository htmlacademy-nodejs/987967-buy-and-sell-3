'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`./const`);

const DEFAULT_COMMAND = `--help`;

const USER_COMMAND_INDEX = 2;

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand] = userInputs;
const commandArg = userInputs.slice(1);

if (!Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
} else {
  Cli[userCommand].run(commandArg, (isSuccess) => {
    process.exit(isSuccess ? ExitCode.SUCCESS : ExitCode.ERROR);
  });
}
