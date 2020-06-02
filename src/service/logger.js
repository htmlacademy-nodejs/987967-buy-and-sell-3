'use strict';

const path = require(`path`);
const {LoggerName} = require(`./const`);
const {getRootFolder} = require(`./utils`);

const logFile = path.resolve(getRootFolder(), `src`, `service`, `logs`);

const logger = require(`pino`)({
  name: LoggerName.SERVER,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: true,
}, logFile);

const LogMessage = {
  getEndRequest: (statusCode, url) => `End request of url ${url} with status code ${statusCode}`,
  getStartRequest: (url) => `Start request to url ${url}`,
  getCreateServer: (port) => `Start server at port ${port}`,
  getErrorCreatingServer: (err) => `Error creating server: ${err}`,
  getUnknownRoute: (url) => `Unknown route: ${url}`,
  getError: (err) => `Unknown error: ${err}`,
  getUtilMessage: (name, message) => `${name} says: ${message}`
};

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
  LogMessage,
};
