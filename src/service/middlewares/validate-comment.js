'use strict';

const {HttpStatusCode, LoggerName} = require(`../const`);
const { getLogger, LogMessage } = require(`../logger`);

const apiLogger = getLogger({ name: LoggerName.API });
const REQUIRED_FIELDS = [`text`];

const validateComment = (req, res, next) => {
  const comment = req.body;
  if (!comment) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong comment data. Comment is empty`);
    apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.BAD_REQUEST, req.originalUrl))
    return;
  }

  const isValid = REQUIRED_FIELDS.reduce((acc, cur) => {
    return acc && (cur in comment);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong comment data. Not all fields are found`);
    apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.BAD_REQUEST, req.originalUrl))
    return;
  }

  next();
};

module.exports = validateComment;
