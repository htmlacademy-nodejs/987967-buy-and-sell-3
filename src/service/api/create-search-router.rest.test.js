'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);

const mockSearch = jest.fn();

jest.mock(`../data-service/offer-service`, () => jest.fn().mockImplementation(() => ({
  search: mockSearch
})));

let server;
const ROOT_PATH = `/api/search`;

beforeAll(async () => {
  server = await createServer();
});

beforeEach(() => {
  mockSearch.mockClear();
});

describe(`Test REST "${ROOT_PATH}"`, () => {
  it(`should return status 200 if path is "${ROOT_PATH}?query=Some%20string"`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?query=Some%20string`);
    expect(res.status).toBe(200);
  });

  it(`should return status 400 if path is "${ROOT_PATH}?query="`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?query=`);
    expect(res.status).toBe(400);
  });

  it(`should return status 400 if path is "${ROOT_PATH}?wrongquery=Some%20string"`, async () => {
    const res = await request(server).get(`${ROOT_PATH}?wrongquery=Some%20string`);
    expect(res.status).toBe(400);
  });

  it(`should call search method once and pass "Some string" if path is "${ROOT_PATH}?query=Some%20string"`, async () => {
    await request(server).get(`${ROOT_PATH}?query=Some%20string`);
    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toBeCalledWith(`Some string`);
  });
});
