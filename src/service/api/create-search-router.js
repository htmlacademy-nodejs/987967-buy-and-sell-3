'use strict';

const {HttpStatusCode, LoggerName} = require(`../const`);
const {Router} = require(`express`);
const {getLogger, LogMessage} = require(`../logger`);

const apiLogger = getLogger({name: LoggerName.API});

const createSearchRouter = (service) => {
  const router = new Router();
  router.get(`/`, (req, res) => {
    const query = req.query.query;

    if (!query) {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request: "query" is empty`);
      apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.BAD_REQUEST, req.originalUrl));
      return;
    }

    res.status(HttpStatusCode.OK).json(service.search(req.query.query));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  return router;
};

module.exports = {
  createSearchRouter
};
