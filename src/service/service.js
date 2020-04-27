'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`./const`);

const DEFAULT_COMMAND = `--help`;
const USER_COMMAND_INDEX = 2;

const handleCommandComplite = (isSuccess) => {
  process.exit(isSuccess ? ExitCode.SUCCESS : ExitCode.ERROR);
};

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand, ...commandArg] = userInputs;

if (!Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run(handleCommandComplite, commandArg);
} else {
  Cli[userCommand].run(handleCommandComplite, commandArg);
}
