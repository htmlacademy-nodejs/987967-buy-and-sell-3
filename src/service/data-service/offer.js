'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../const`);

class offerService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    return this._offers;
  }

  getOne(id) {
    return this._offers.find((it) => it.id === id);
  }

  create(offer) {
    const newOffer = Object.assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);
    this._offers.push(newOffer);
    return newOffer;
  }

  delete(id) {
    const deletedOffer = this._offers.find((it) => it.id === id);
    if (deletedOffer) {
      this._offers = this._offers.filter((it) => it.id !== id);
    }

    return deletedOffer;
  }

  update(offer) {
    const index = this._offers.findIndex((it) => it.id === offer.id);
    if (index === -1) {
      return null;
    }

    const updatedOffer = Object.assign({}, this._offers[index], offer);
    this._offers[index] = updatedOffer;
    return updatedOffer;
  }

  search(query) {
    const regexp = new RegExp(query, `i`);
    return this._offers.filter((it) => regexp.test(it.title));
  }
}

module.exports = offerService;
