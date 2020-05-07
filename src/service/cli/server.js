'use strict';

const chalk = require(`chalk`);
const {createServer, STATUS_CODES} = require(`http`);
const {ExitCode, MOCK_FILE_NAME, HttpStatusCode} = require(`../const`);
const {sendResponse, getMockTitles, getTitleList} = require(`../../utils`);

const DEFAULT_PORT = 3000;

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const titles = await getMockTitles(`./${MOCK_FILE_NAME}`);
        const message = getTitleList(titles);
        sendResponse(HttpStatusCode.OK, message, res);
      } catch (err) {
        sendResponse(HttpStatusCode.NOT_FOUND, STATUS_CODES[HttpStatusCode.NOT_FOUND], res);
      }
      break;

    default:
      sendResponse(HttpStatusCode.NOT_FOUND, STATUS_CODES[HttpStatusCode.NOT_FOUND], res);
  }
};

module.exports = {
  name: `--server`,
  run(portName) {
    const port = parseInt(portName, 10) || DEFAULT_PORT;

    createServer(onClientConnect).listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Error creating server: "${err}"`));
        process.exit(ExitCode.ERROR);
      }

      console.info(chalk.green(`Listening port ${port}...`));
    });

    return ExitCode.WORKING;
  }
};
