'use strict';

const getMockData = require(`../lib/get-mock-data`);
const {Router} = require(`express`);
const {createCategoryRouter} = require(`./create-category-router`);
const {createSearchRouter} = require(`./create-search-router`);
const {createOfferRouter} = require(`./create-offer-router`);
const {CategoryService, CommentService, OfferService} = require(`../data-service`);

const createAPI = async () => {
  const router = new Router();
  const offers = await getMockData();
  const offerService = new OfferService(offers);

  router.use(`/categories`, createCategoryRouter(new CategoryService(offers)));
  router.use(`/offers`, createOfferRouter(offerService, new CommentService(offers)));
  router.use(`/search`, createSearchRouter(offerService));

  return router;
};

module.exports = {
  createAPI,
};
