'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {adaptCategory, adaptOffer, sortOffersByDate, sortOffersByPopular} = require(`../utils`);

const LATEST_COUNT = 8;
const POPULAR_COUNT = 4;

const mainRouter = new Router();
const dataServer = new DataServer();

const getData = async (server) => {
  let data;
  try {
    data = await Promise.all([server.getCategories(), server.getOffers()]);
  } catch (err) {
    throw err;
  }

  return {
    categories: data[0],
    offers: data[1]
  };
};

mainRouter.get(`/`, async (req, res, next) => {
  let data;

  try {
    data = await getData(dataServer);
  } catch (err) {
    next(err);
    return;
  }

  res.render(`main.pug`, {
    categories: data.categories,
    popularOffers: sortOffersByPopular(data.offers).slice(0, POPULAR_COUNT),
    latestOffers: sortOffersByDate(data.offers).slice(0, LATEST_COUNT),
  });
});

module.exports = {
  mainRouter,
};
