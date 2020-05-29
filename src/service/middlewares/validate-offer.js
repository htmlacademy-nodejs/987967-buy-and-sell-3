'use strict';

const {HttpStatusCode} = require(`../const`);

const REQUIRED_FIELD = [`title`, `picture`, `description`, `type`, `sum`, `category`];

const validateOffer = (req, res, next) => {
  const offer = req.body;

  if (!offer) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Offer is empty`);
  }

  REQUIRED_FIELD.forEach((it) => {
    if (!(it in offer)) {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Field "${it}" not found`);
    }
  });

  next();
};

module.exports = validateOffer;
