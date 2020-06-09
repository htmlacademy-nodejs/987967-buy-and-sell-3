'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {sortOffersByDate} = require(`../utils`);

const myRouter = new Router();
const dataServer = new DataServer();

myRouter.get(`/`, async (req, res) => {
  const offers = sortOffersByDate(await dataServer.getUserOffers());
  res.render(`my-tickets`, {offers});
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await dataServer.getUserOffers();
  res.render(`comments`, {
    offers: offers.filter((it) => it.comments.length).slice(0, 3),
  });
});

module.exports = {
  myRouter,
};
