'use strict';

const {Router} = require(`express`);
const { DataServer } = require(`../data-server`);
const { sortOffersByDate } = require(`../utils`);
const { LATEST_COUNT } = require(`../const`);

const searchRouter = new Router();
const dataServer = new DataServer();

searchRouter.get(`/`, async (req, res) => {
  const searchValue = req.query.search;
  const [offers, searchResult] = await Promise.all([dataServer.getOffers(), dataServer.search(searchValue)]);
  const latestOffers = sortOffersByDate(offers).slice(0, LATEST_COUNT);

  res.render(`search-result`, {
    searchValue,
    latestOffers,
    searchResult,
  });
});

module.exports = {
  searchRouter,
};
