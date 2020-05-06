'use strict';

const chalk = require(`chalk`);
const { createServer, STATUS_CODES } = require(`http`);
const { ExitCode, MOCK_FILE_NAME, HttpStatusCode } = require(`../const`);
const fs = require(`fs`);

const DEFAULT_PORT = 3000;

const sendResponse = (status, message, res) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = status;
  res.writeHead(status, {
    "content-type": `text/html; charset=utf-8`
  });
  res.end(template);
}

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const titles = JSON.parse(await fs.promises.readFile(`./${MOCK_FILE_NAME}`))
          .map(it => it.title);
        
        const message = `<ul>${titles.map(it => `<li>${it}</li>`).join(`\n`)}</ul>`;

        sendResponse(HttpStatusCode.OK, message, res);
      } catch (err) {
        sendResponse(HttpStatusCode.NOT_FOUND, STATUS_CODES[HttpStatusCode.NOT_FOUND], res)
      }
      break;

    default:
      sendResponse(HttpStatusCode.NOT_FOUND, STATUS_CODES[HttpStatusCode.NOT_FOUND], res)
  }

  sendResponse(200, req.url, res)
}

module.exports = {
  name: `--server`,
  run(portName) {
    const port = Number.parseInt(portName, 10) || DEFAULT_PORT;

    createServer(onClientConnect).listen(port, (err) => {
      if (err) {
        console.error(chalk.red(`Error creating server: "${err}"`));
        process.exit(ExitCode.ERROR)
      };

      console.info(chalk.green(`Listening port ${port}...`));
    });

    return ExitCode.WORKING
  }
};
