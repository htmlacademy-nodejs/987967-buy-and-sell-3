'use strict';

const {getMockOffers} = require(`../utils`);

let data = null;

const getMockData = async () => {
  if (!data) {
    data = await getMockOffers();
  }

  return data;
};

module.exports = getMockData;
