'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const {categoryRouterCreator} = require(`./categories`);
// const { searchRouter } = require(`./search`);
const {offerRouterCreator} = require(`./offers`);
const {CategoryService, CommentService, OfferService, SearchService} = require(`../data-service/`);

const app = new Router();

(async () => {
  const offers = await getMockData();

  app.use(`/categories`, categoryRouterCreator(new CategoryService(offers)));
  app.use(`/offers`, offerRouterCreator(new OfferService(offers), new CommentService(offers)));
  // app.use(`/search`, offerRouter);
})();

module.exports = app;
