'use strict';

const {OfferType, CARD_COLORS} = require(`./const`);

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
  sortedOffers.sort(() => Math.random() - Math.random());
  return sortedOffers;
};

const getCategoryImageName = () => `cat${getRandomElement([``, `02`, `03`, `04`, `05`, `06`])}`;

const adaptCategory = (category) => ({
  ...category,
  img: getCategoryImageName(),
  href: `/offers/category/${category.id}`
});

const adaptOffer = (offer) => {
  const adaptedOffer = {...offer};

  adaptedOffer.category = adaptCategory(adaptedOffer.category);
  adaptedOffer.pictureX2 = offer.picture.replace(/\./, `@2x.`);
  adaptedOffer.typeName = OfferType[offer.type];
  adaptedOffer.cardColor = getRandomElement(CARD_COLORS);

  return adaptedOffer;
};

module.exports = {
  getRandomElement,
  getRandomInt,
  sortOffersByDate,
  sortOffersByPopular,
  adaptOffer,
  adaptCategory,
};
