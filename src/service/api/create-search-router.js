'use strict';

const {HttpStatusCode} = require(`../const`);
const {Router} = require(`express`);

const createSearchRouter = (service) => {
  const router = new Router();
  router.get(`/`, (req, res) => {
    const query = req.query.query;

    if (!query) {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request: "query" is empty`);
    }

    res.status(HttpStatusCode.OK).json(service.search(req.query.query));
  });

  return router;
};

module.exports = {
  createSearchRouter
};
