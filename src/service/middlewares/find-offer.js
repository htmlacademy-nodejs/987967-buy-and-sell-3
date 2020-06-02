'use strict';

const { HttpStatusCode, LoggerName } = require(`../const`);
const { getLogger, LogMessage } = require(`../logger`);

const apiLogger = getLogger({ name: LoggerName.API });

module.exports = (offerService) => (req, res, next) => {
  const {offerID} = req.params;
  const offer = offerService.getOne(offerID);

  if (!offer) {
    res.status(HttpStatusCode.NOT_FOUND).send(`Offer with id="${offerID}" not found`);
    apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.NOT_FOUND, req.originalUrl))
    return;
  }

  res.locals.offer = offer;
  next();
};
