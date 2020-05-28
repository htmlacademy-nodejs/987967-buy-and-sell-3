'use strict';

const request = require(`supertest`);
const { server } = require(`../cli/server`);
const { API_PREFIX } = require(`../const`);

test(`1`, async () => {
  const res1 = await request(server).get(`${API_PREFIX}/categories`);
  const res2 = await request(server).get(`${API_PREFIX}/categories`);
  const res = await request(server).get(`${API_PREFIX}/categories`);
  console.log(JSON.stringify(res));
  
  expect(res.status).toBe(200);
})