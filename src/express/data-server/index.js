'use strict';

const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`../const`);
const {adaptCategory, adaptOffer, getRandomInt} = require(`../utils`);

const createAPI = (port) => axios.create({
  baseURL: `http://localhost:${port}/api`,
  timeout: TIMEOUT,
  withCredentials: true,
});

class DataServer {
  constructor() {
    this._api = createAPI(DATA_SERVER_PORT)
  }

  async getCategories() {
    let res;
    try {
      res = await this._api.get(`/categories`);
    } catch (err) {
      console.error(`Can't get categories: ${err}`);
      throw new Error(`Can't get categories: ${err}`);
    };

    return res.data.map(it => adaptCategory(it));
  }

  async getOffers() {
    let res;
    try {
      res = await this._api.get(`/offers`);
    } catch (err) {
      console.error(`Can't get offers: ${err}`);
      throw new Error(`Can't get offers: ${err}`);
    };

    return res.data.map(it => adaptOffer(it));
  }

  async getOffer(id) {
    let res;
    try {
      res = await this._api.get(`/offers/${id}`);
    } catch (err) {
      console.error(`Can't get offer: ${err}`);
      throw new Error(`Can't get offer: ${err}`);
    };

    return adaptOffer(res.data);
  }

  async getUserOffers() {
    const offers = await this.getOffers();
    const userOffers = offers.slice(0, getRandomInt(1, Math.floor(offers.length/2 - 1)));
    return userOffers
  }

  async getComments(offerID) {
    let res;
    try {
      res = await this._api.get(`/offers/${offerID}/comments`);
    } catch (err) {
      console.error(`Can't get comments: ${err}`);
      throw new Error(`Can't get comments: ${err}`);
    };

    return res.data
  }
}

module.exports = {
  DataServer,
};
