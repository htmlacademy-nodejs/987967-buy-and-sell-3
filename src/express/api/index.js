'use strict';

const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`../const`);

const createAPI = (port) => axios.create({
  baseURL: `http://localhost:${port}/api`,
  timeout: TIMEOUT,
  withCredentials: true,
});

module.exports = {
  api: createAPI(DATA_SERVER_PORT),
};
