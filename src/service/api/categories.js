'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);

const router = new Router();

const categoryRouterCreator = (service) => {
  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getAll());
  });

  return router;
};

module.exports = {
  categoryRouterCreator
};
