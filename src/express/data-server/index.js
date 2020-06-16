'use strict';

const axios = require(`axios`).default;
const queryString = require(`querystring`);
const {TIMEOUT, DATA_SERVER_PORT} = require(`../const`);
const {ServiceToExpressAdapter} = require(`../data-adapter`);
const {getLogger, LoggerName} = require(`../logger`);

const createAPI = (port) => axios.create({
  baseURL: `http://localhost:${port}/api`,
  timeout: TIMEOUT,
  withCredentials: true,
});

const logger = getLogger(LoggerName.DATA);

class DataServer {
  constructor() {
    this._api = createAPI(DATA_SERVER_PORT);
  }

  async getCategories() {
    let res;
    try {
      res = await this._api.get(`/categories`);
    } catch (err) {
      logger.error(`Can't get categories: ${err}`);
      throw new Error(`Can't get categories: ${err}`);
    }

    return ServiceToExpressAdapter.getCategories(res.data);
  }

  async getOffers() {
    let res;
    try {
      res = await this._api.get(`/offers`);
    } catch (err) {
      logger.error(`Can't get offers: ${err}`);
      throw new Error(`Can't get offers: ${err}`);
    }

    return res.data.map((it) => ServiceToExpressAdapter.getOffer(it));
  }

  async getOffer(id) {
    let res;
    try {
      res = await this._api.get(`/offers/${id}`);
    } catch (err) {
      logger.error(`Can't get offer: ${err}`);
      throw new Error(`Can't get offer: ${err}`);
    }

    return ServiceToExpressAdapter.getOffer(res.data);
  }

  async getUserOffers() {
    return this.getOffers();
  }

  async getComments(offerID) {
    let res;
    try {
      res = await this._api.get(`/offers/${offerID}/comments`);
    } catch (err) {
      logger.error(`Can't get comments: ${err}`);
      throw new Error(`Can't get comments: ${err}`);
    }

    return res.data;
  }

  async createOffer(offer) {
    let res;
    try {
      res = await this._api.post(`/offers`, offer);
    } catch (err) {
      logger.error(`Can't create offer: ${err}`);
      throw new Error(`Can't create offer: ${err}`);
    }

    return res.data;
  }

  async search(searchValue) {
    if (!searchValue) {
      return [];
    }

    const query = queryString.encode({
      query: searchValue
    });

    let res;
    try {
      res = await this._api.get(`/search?${query}`);
    } catch (err) {
      logger.error(`Offer search error: ${err}`);
      throw new Error(`Offer search error: ${err}`);
    }

    return res.data.map((it) => ServiceToExpressAdapter.getOffer(it));
  }
}

module.exports = {
  DataServer,
};
