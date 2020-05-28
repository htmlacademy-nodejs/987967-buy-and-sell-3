'use strict';

const request = require(`supertest`);
const { apiCreator } = require(`../api`);
const { API_PREFIX } = require(`../const`);
const getMockData = require(`../lib/get-mock-data`);

// test(`1`, async () => {
//   const offers = await getMockData();
//   console.log(`-------`);
  
//   const res = await request(server).get(`${API_PREFIX}/categories`);
//   console.log(JSON.stringify(res.body));
  
//   expect(res.status).toBe(200);
// })

test(`2`, async () => {
  const server = await apiCreator();
  const res = await request(server).get(`/categories`);
  console.log(JSON.stringify(res.body));
  
  expect(res.status).toBe(200);
})