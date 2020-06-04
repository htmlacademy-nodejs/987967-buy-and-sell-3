'use strict';

const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`../const`);
const {adaptCategory, adaptOffer} = require(`../utils`);

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
}

module.exports = {
  DataServer,
};
