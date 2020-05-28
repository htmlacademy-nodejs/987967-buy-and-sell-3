'use strict';

class categoryService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    const categoryOffers = {};

    this._offers.forEach((it) => {
      if (categoryOffers[it.category] === undefined) {
        categoryOffers[it.category] = [it];
      } else {
        categoryOffers[it.category].push(it);
      }
    });

    const categories = Object.keys(categoryOffers).map((it) => ({
      name: it,
      offerCount: categoryOffers[it].length,
      // offers: categoryOffers[it],
    }));

    return categories;
  }
}

module.exports = categoryService;
