'use strict';

const request = require(`supertest`);
const queryString = require(`querystring`);
const {createServer} = require(`../cli/server`);
const {HttpStatusCode} = require(`../const`);

const ROOT_PATH = `/api/search`;
let server;

beforeAll(async () => {
  server = await createServer();
});

describe(`Test ${ROOT_PATH}`, () => {
  it(`should be available when path is ${ROOT_PATH}?query=something`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?query=something`);
    expect(res.status).toBe(HttpStatusCode.OK);
  });

  it(`should return 400 if "query" is empty`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?query=`);
    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it(`should return 400 if "query" is missing`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?other-query=`);
    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it(`should find an offer`, async () => {
    const offerResponse = await request(server).get(`/api/offers`);
    const offer = offerResponse.body[0];

    const title = offer.title;
    const query = queryString.encode({
      query: title
    });

    const res = await request(server).get(`${ROOT_PATH}?${query}`);
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(res.body[0].title).toEqual(title);
  });
});
