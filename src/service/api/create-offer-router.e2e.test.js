'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {HttpStatusCode} = require(`../const`);

const ROOT_PATH = `/api/offers`;
let server;
const offerMock = {
  "title": `Шервуд Том. Остров Локк. Псевдо бпнф`,
  "picture": `item08.jpg`,
  "description": `Это настоящая находка для коллекционера!\nДоставка по всей России Бесплатно!Самовывоз`,
  "type": `sale`,
  "sum": 42788,
  "category": `Ролики и скейтбординг`
};

beforeAll(async () => {
  server = await createServer();
});

describe(`Test ${ROOT_PATH}`, () => {
  it(`should return array if GET method`, async () => {
    const res = await request(server).get(`${ROOT_PATH}`);
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(res.body).toHaveProperty(`length`);
  });

  it(`should return a new offer if POST method and sent offer is valid`, async () => {
    const res = await request(server)
      .post(`${ROOT_PATH}`)
      .send(offerMock)
      .set(`Content-Type`, `application/json`)
      .set(`Accept`, `application/json`);

    const newID = res.body.id;
    const offerResponse = await request(server).get(`${ROOT_PATH}/${newID}`);

    expect(res.status).toBe(HttpStatusCode.CREATED);
    expect(res.body.title).toEqual(offerMock.title);
    expect(offerResponse.status).toBe(HttpStatusCode.OK);
    expect(offerResponse.body.title).toEqual(offerResponse.body.title);
  });
});

describe(`Test ${ROOT_PATH}/:offerID`, () => {
  it(`should return 404 when path is ${ROOT_PATH}/wrongid`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/wrongid`);
    expect(res.status).toBe(HttpStatusCode.NOT_FOUND);
  });

  it(`should return an offer if GET method with right offerID`, async () => {
    const offersResponse = await request(server).get(`${ROOT_PATH}`);
    const rightID = offersResponse.body[0].id;
    const offerResponse = await request(server).get(`${ROOT_PATH}/${rightID}`);

    expect(offerResponse.status).toBe(HttpStatusCode.OK);
    expect(offerResponse.body.id).toBe(rightID);
  });

  it(`should return an updated offer if PUT method and sent offer is valid`, async () => {
    const offersResponse = await request(server).get(`${ROOT_PATH}`);
    const rightID = offersResponse.body[0].id;
    const updateResponse = await request(server)
      .put(`${ROOT_PATH}/${rightID}`)
      .send(offerMock)
      .set(`Content-Type`, `application/json`)
      .set(`Accept`, `application/json`);

    const offerResponse = await request(server).get(`${ROOT_PATH}/${rightID}`);

    expect(updateResponse.status).toBe(HttpStatusCode.OK);
    expect(updateResponse.body.id).toBe(rightID);
    expect(updateResponse.body.title).toBe(offerMock.title);
    expect(offerResponse.body.title).toBe(offerMock.title);
  });

  it(`should return an 400 if PUT method and sent offer is not valid`, async () => {
    const offersResponse = await request(server).get(`${ROOT_PATH}`);
    const rightID = offersResponse.body[0].id;
    const updateResponse = await request(server)
      .put(`${ROOT_PATH}/${rightID}`)
      .send({"isValid": false})
      .set(`Content-Type`, `application/json`)
      .set(`Accept`, `application/json`);

    expect(updateResponse.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it(`should return an 404 if PUT method and offerID is wrong`, async () => {
    const updateResponse = await request(server)
      .put(`${ROOT_PATH}/wrongID`)
      .send(offerMock)
      .set(`Content-Type`, `application/json`)
      .set(`Accept`, `application/json`);

    expect(updateResponse.status).toBe(HttpStatusCode.NOT_FOUND);
  });

  it(`should return a deleted offer if DELETE method and offerID is right`, async () => {
    const offersResponse = await request(server).get(`${ROOT_PATH}`);
    const rightID = offersResponse.body[0].id;
    const deleteResponse = await request(server)
      .delete(`${ROOT_PATH}/${rightID}`);

    const offerResponse = await request(server).get(`${ROOT_PATH}/${rightID}`);

    expect(deleteResponse.status).toBe(HttpStatusCode.OK);
    expect(deleteResponse.body.id).toBe(rightID);
    expect(offerResponse.status).toBe(HttpStatusCode.NOT_FOUND);
  });
});
