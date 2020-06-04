'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    const categoryOffers = {};

    this._offers.forEach((it) => {
      if (categoryOffers[it.category.id] === undefined) {
        categoryOffers[it.category.id] = [it];
      } else {
        categoryOffers[it.category.id].push(it);
      }
    });

    const categories = Object.keys(categoryOffers).map((it) => ({
      ...categoryOffers[it][0].category,
      offerCount: categoryOffers[it].length,
    }));

    return categories;
  }
}

module.exports = CategoryService;
