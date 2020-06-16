'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    const categoryOffers = {};

    this._offers.forEach((offer) => {
      offer.categories.forEach((it) => {
        if (categoryOffers[it.id] === undefined) {
          categoryOffers[it.id] = {
            ...it,
            offerCount: 1
          };
        } else {
          categoryOffers[it.id].offerCount++;
        }
      });
    });

    return Object.values(categoryOffers);
  }
}

module.exports = CategoryService;
