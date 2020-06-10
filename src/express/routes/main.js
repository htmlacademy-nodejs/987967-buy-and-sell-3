'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {sortOffersByDate, sortOffersByPopular} = require(`../utils`);
const {LATEST_COUNT, POPULAR_COUNT} = require(`../const`);
const {LogMessage, LoggerName, getLogger} = require(`../logger`);

const mainRouter = new Router();
const dataServer = new DataServer();
const apiLogger = getLogger(LoggerName.APP_API);

mainRouter.get(`/`, async (req, res, next) => {
  let data;

  try {
    data = await Promise.all([dataServer.getCategories(), dataServer.getOffers()]);
  } catch (err) {
    apiLogger.error(LogMessage.getError(err));
    next(err);
    return;
  }

  apiLogger.info(LogMessage.getEndRequest(req.url));

  res.render(`main.pug`, {
    categories: data[0],
    popularOffers: sortOffersByPopular(data[1]).slice(0, POPULAR_COUNT),
    latestOffers: sortOffersByDate(data[1]).slice(0, LATEST_COUNT),
  });
});

module.exports = {
  mainRouter,
};
