'use strict';

const {HttpStatusCode} = require(`../const`);

const getNotFoundMessage = (offerID) => `Offer with id="${offerID}" not found`;

module.exports = (offerService) => (req, res, next) => {
  const {offerID} = req.params;
  const offer = offerService.getOne(offerID);

  if (!offer) {
    res.status(HttpStatusCode.NOT_FOUND).send(getNotFoundMessage(offerID));
  }

  res.locals.offer = offer;
  next();
};
