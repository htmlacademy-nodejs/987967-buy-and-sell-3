'use strict';

const {HttpStatusCode} = require(`../const`);
const {Router} = require(`express`);

const createCategoryRouter = (service) => {
  const router = new Router();
  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getAll());
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
