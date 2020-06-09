'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {sortOffersByDate, sortOffersByPopular} = require(`../utils`);
const {LATEST_COUNT, POPULAR_COUNT} = require(`../const`);

const mainRouter = new Router();
const dataServer = new DataServer();

mainRouter.get(`/`, async (req, res, next) => {
  let data;

  try {
    data = await Promise.all([dataServer.getCategories(), dataServer.getOffers()]);
  } catch (err) {
    next(err);
    return;
  }

  res.render(`main.pug`, {
    categories: data[0],
    popularOffers: sortOffersByPopular(data[1]).slice(0, POPULAR_COUNT),
    latestOffers: sortOffersByDate(data[1]).slice(0, LATEST_COUNT),
  });
});

module.exports = {
  mainRouter,
};
