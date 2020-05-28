'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const {categoryRouterCreator} = require(`./categories`);
const {searchRouterCreator} = require(`./search`);
const {offerRouterCreator} = require(`./offers`);
const {CategoryService, CommentService, OfferService} = require(`../data-service/`);

const app = new Router();

const apiCreator = async () => {
  const offers = await getMockData();
  const offerService = new OfferService(offers);

  app.use(`/categories`, categoryRouterCreator(new CategoryService(offers)));
  app.use(`/offers`, offerRouterCreator(offerService, new CommentService(offers)));
  app.use(`/search`, searchRouterCreator(offerService));

  return app;
};

apiCreator();

module.exports = {
  apiRouter: app,
  apiCreator,
};
