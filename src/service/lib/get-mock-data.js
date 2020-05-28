'use strict';

const {getMockOffers} = require(`../utils`);

let data = null;

const getMockData = async () => {
  console.log(data ? data.length : `null`);
  
  if (!data) {
    data = await getMockOffers();
  }

  return data;
};

module.exports = getMockData;
