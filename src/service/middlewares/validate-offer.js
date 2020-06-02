'use strict';

const {HttpStatusCode, LoggerName} = require(`../const`);
const { getLogger, LogMessage } = require(`../logger`);

const apiLogger = getLogger({ name: LoggerName.API });
const REQUIRED_FIELD = [`title`, `picture`, `description`, `type`, `sum`, `category`];

const validateOffer = (req, res, next) => {
  const offer = req.body;

  if (!offer) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Offer is empty`);
    apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.BAD_REQUEST, req.originalUrl))
    return;
  }

  const isValid = REQUIRED_FIELD.reduce((acc, cur) => {
    return acc && (cur in offer);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Not all fields are found`);
    apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.BAD_REQUEST, req.originalUrl))
    return;
  }

  next();
};

module.exports = validateOffer;
