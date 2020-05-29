'use strict';

const {HttpStatusCode} = require(`../const`);

module.exports = (offerService) => (req, res, next) => {
  const {offerID} = req.params;
  const offer = offerService.getOne(offerID);

  if (!offer) {
    res.status(HttpStatusCode.NOT_FOUND).send(`Offer with id="${offerID}" not found`);
    return;
  }

  res.locals.offer = offer;
  next();
};
