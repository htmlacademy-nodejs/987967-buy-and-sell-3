'use strict';

const request = require(`supertest`);
const express = require(`express`);
const { createAPI } = require(`.`);

const ROOT_PATH = `/categories`;
let server;

beforeAll(async () => {
  server = express();
  const api = await createAPI();
  server.use(api);
});

describe(`Test ${ROOT_PATH}`, () => {
  it(`should be available when path is ${ROOT_PATH}`, async () => {
    const res = await request(server).get(ROOT_PATH);
    expect(res.status).toBe(200);
  });

  it(`should return 404 if path is not ${ROOT_PATH}`, async () => {
    const res = await request(server).get(`${ROOT_PATH}${Date.now()}`);
    expect(res.status).toBe(404);
  });
})
