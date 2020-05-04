'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`./const`);

const DEFAULT_COMMAND = `--help`;
const USER_COMMAND_INDEX = 2;

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand, ...commandArg] = userInputs;

const commandExecuter = async (arg) => {
  const command = Cli[userCommand] || Cli[DEFAULT_COMMAND];
  try {
    await command.run(arg);
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    process.exit(ExitCode.ERROR);
  }
};

commandExecuter(commandArg);
