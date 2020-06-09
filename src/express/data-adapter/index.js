'use strict';

const { CATEGORIES, OfferTypeName, CARD_COLORS, CategoryProperties, NO_PICTURE, OfferType } = require(`../const`);
const { getRandomElement } = require(`../utils`);

const FormToServiceAdapter = {
  getOffer(formData, file) {
    return {
      title: formData[`ticket-name`],
      description: formData.comment,
      sum: parseInt(formData.price, 10),
      type: OfferType[formData.action],
      categories: Array.isArray(formData.category)
        ? formData.category.map(it => CategoryProperties[CATEGORIES[it]])
        : [CategoryProperties[CATEGORIES[formData.category]]],
      picture: file ? file.filename : NO_PICTURE
    }
  }
};

const ServiceToExpressAdapter = {
  getCategories(categories) {
    return categories.map(it => ({
      ...it,
      href: `/offers/category/${it.id}`,
      img: CategoryProperties[it.name].img,
    }))
  },

  getOffer(offer) {
    return {
      ...offer,
      typeName: OfferTypeName[offer.type],
      cardColor: getRandomElement(CARD_COLORS),
      categories: ServiceToExpressAdapter.getCategories(offer.categories),
      categoryIndexes: offer.categories.map(category => CATEGORIES.findIndex(it => it === category.name)),
    }
  }
}

module.exports = {
  ServiceToExpressAdapter,
  FormToServiceAdapter,
}