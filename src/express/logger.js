'use strict';

const path = require(`path`);
const pino = require(`pino`);
const fs = require(`fs`);

const logFile = path.resolve(__dirname, `logs`);

if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile)
}

const LogMessage = {
  getEndRequest: (url, statusCode) => `End request of url ${url} ${statusCode ? `with status code ${statusCode}` : ``}`,
  getStartRequest: (url) => `Start request to url ${url}`,
  getCreateServer: (port) => `Start server at port ${port}`,
  getErrorCreatingServer: (err) => `Error creating server: ${err}`,
  getUnknownRoute: (url) => `Unknown route: ${url}`,
  getError: (err) => `Unknown error: ${err}`,
  getUtilMessage: (name, message) => `${name} says: ${message}`
};

const LoggerName = {
  APP: `app-server`,
  APP_API: `app-server:api`,
  DATA: `data-server,`
}

const logger = pino({
  name: LoggerName.APP,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: true,
}, logFile);

module.exports = {
  LoggerName,
  LogMessage,
  logger,
  getLogger(loggerName, options = {}) {
    options.name = loggerName;
    return logger.child(options);
  },
};
