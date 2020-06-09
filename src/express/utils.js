'use strict';

const {ValueCheck} = require(`./const`);

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const sortOffersByPopular = (offers) => {
  const sortedOffers = offers.slice();
  sortedOffers.sort((a, b) => b.comments.length - a.comments.length);
  return sortedOffers;
};

const sortOffersByDate = (offers) => {
  const sortedOffers = offers.slice();
  sortedOffers.sort((a, b) => b.date - a.date);
  return sortedOffers;
};

const validateTicket = (ticket) => {
  const validateMessage = {isValid: true};
  Object.keys(ValueCheck).forEach((it) => {
    const message = ValueCheck[it](ticket[it]);
    validateMessage[it] = message;
    validateMessage.isValid = validateMessage.isValid && (message === ``);
  });

  return validateMessage;
};

module.exports = {
  getRandomElement,
  getRandomInt,
  sortOffersByDate,
  sortOffersByPopular,
  validateTicket,
};
