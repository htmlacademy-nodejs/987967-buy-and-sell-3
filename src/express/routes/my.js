'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const { sortOffersByDate } = require(`../utils`);
const {getLogger, LoggerName, LogMessage} = require(`../logger`);

const myRouter = new Router();
const dataServer = new DataServer();
const logger = getLogger(LoggerName.APP_API);

myRouter.get(`/`, async (req, res) => {
  const offers = sortOffersByDate(await dataServer.getUserOffers());
  logger.info(LogMessage.getEndRequest(req.url));
  res.render(`my-tickets`, {offers});
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await dataServer.getUserOffers();
  const offersWithComments = offers.filter((it) => it.comments.length);

  logger.info(LogMessage.getEndRequest(req.url));
  logger.debug(`Offers with comments count: ${offersWithComments.length}`)

  res.render(`comments`, {
    offers: offersWithComments.slice(0, 3),
  });
});

module.exports = {
  myRouter,
};
