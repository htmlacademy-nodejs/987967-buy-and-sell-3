'use strict';

const {HttpStatusCode} = require(`../const`);

const REQUIRED_FIELD = [`title`, `picture`, `description`, `type`, `sum`, `category`];

const validateOffer = (req, res, next) => {
  const offer = req.body;

  if (!offer) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Offer is empty`);
    return;
  }

  const isValid = REQUIRED_FIELD.reduce((acc, cur) => {
    return acc && (cur in offer);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong offer data. Not all fields are found`);
    return;
  }

  next();
};

module.exports = validateOffer;
