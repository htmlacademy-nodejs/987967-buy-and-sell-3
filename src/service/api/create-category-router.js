'use strict';

const {HttpStatusCode} = require(`../const`);
const { Router } = require(`express`);
const { getLogger, LogMessage } = require(`../logger`);

const apiLogger = getLogger({
  name: `server:api`
})

const createCategoryRouter = (service) => {
  const router = new Router();
  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getAll());
    apiLogger.info(LogMessage.getEndRequest(res.status, req.originalUrl))
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
