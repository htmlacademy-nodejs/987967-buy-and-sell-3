'use strict';

const { OfferTypeName, CARD_COLORS, OfferType, ValueCheck } = require(`./const`);

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

const getCategoryImageName = () => `cat${getRandomElement([``, `02`, `03`, `04`, `05`, `06`])}`;

const adaptCategory = (category) => ({
  ...category,
  img: getCategoryImageName(),
  href: `/offers/category/${category.id}`
});

const adaptOffer = (offer) => {
  const adaptedOffer = { ...offer };

  adaptedOffer.categories = offer.categories.map(it => adaptCategory(it));
  adaptedOffer.pictureX2 = offer.picture.replace(/\./, `@2x.`);
  adaptedOffer.typeName = OfferTypeName[offer.type];
  adaptedOffer.cardColor = getRandomElement(CARD_COLORS);

  return adaptedOffer;
};

const offerToRaw = (offer, categories) => {
  return {
    title: offer[`ticket-name`],
    description: offer.comment,
    sum: offer.price,
    type: OfferType[offer.action],
    categories: Array.isArray(offer.category) ? offer.category.map(it => categories[it]) : [categories[offer.category]],
    picture: offer.file.filename,
  }
};

const validateTicket = (ticket) => {
  const validateMessage = {isValid: true};
  Object.keys(ValueCheck).forEach(it => {
    const message = ValueCheck[it](ticket[it]);
    validateMessage[it] = message;
    validateMessage.isValid = validateMessage.isValid && (message === ``)
  });
  
  return validateMessage
};

module.exports = {
  getRandomElement,
  getRandomInt,
  sortOffersByDate,
  sortOffersByPopular,
  validateTicket,
};
