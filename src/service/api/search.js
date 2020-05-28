'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);

const router = new Router();

const searchRouterCreator = (service) => {
  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.search(req.query.query));
  });

  return router;
};

module.exports = {
  searchRouterCreator
};
