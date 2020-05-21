'use strict';

const {Router} = require(`express`);
const {getMockOffers} = require(`../../../utils`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const offers = await getMockOffers();
    res.json(offers);
  } catch (err) {
    res.json([]);
  }
});

module.exports = {
  offersRouter,
};
