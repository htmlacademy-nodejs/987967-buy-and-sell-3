'use strict';

const path = require(`path`);
const fs = require(`fs`);
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
  sortedOffers.sort((a, b) => a.date - b.date);
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

const readContent = async (filename, logger) => {
  try {
    const content = await fs.promises.readFile(filename, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    if (logger) {
      logger.error(`Can't read file ${filename}: ${err}`);
    }

    return [];
  }
};

const getAllCategories = async () => await readContent(`./data/categories.txt`);

module.exports = {
  getRandomElement,
  getRandomInt,
  sortOffersByDate,
  sortOffersByPopular,
  adaptOffer,
  adaptCategory,
  getAllCategories,
};
