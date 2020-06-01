'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);

const ROOT_PATH = `/api/categories`;
let server;

beforeAll(async () => {
  server = await createServer();
});

describe(`Test ${ROOT_PATH}`, () => {
  it(`should return an array when GET method`, async () => {
    const res = await request(server).get(ROOT_PATH);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(`length`);
  });
});
