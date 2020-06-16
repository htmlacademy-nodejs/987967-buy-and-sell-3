'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {HttpStatusCode} = require(`../const`);

const ROOT_PATH = `/api/offers`;
let server;
const fakeIDs = [];
const offerMock = {
  "title": `Шервуд Том. Остров Локк. Псевдо бпнф`,
  "picture": `item08.jpg`,
  "description": `Это настоящая находка для коллекционера!\nДоставка по всей России Бесплатно!Самовывоз`,
  "type": `sale`,
  "sum": 42788,
  "category": {
    id: `category-id-1`,
    name: `Ролики и скейтбординг`
  }
};

beforeAll(async () => {
  server = await createServer();
});

afterAll(() => {
  fakeIDs.forEach(async (it) => await request(server).delete(`${ROOT_PATH}/${it}`));
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
    fakeIDs.push(newID);
    const offerResponse = await request(server).get(`${ROOT_PATH}/${newID}`);

    expect(res.status).toBe(HttpStatusCode.CREATED);
    expect(res.body.title).toEqual(offerMock.title);
    expect(offerResponse.status).toBe(HttpStatusCode.OK);
    expect(offerResponse.body.title).toEqual(offerResponse.body.title);
  });

  it(`should return 400 if POST method and sent offer is not valid`, async () => {
    const beforeResponse = await request(server).get(ROOT_PATH);
    const res = await request(server)
      .post(`${ROOT_PATH}`)
      .send({"isValid": false});
    const afterResponse = await request(server).get(ROOT_PATH);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(beforeResponse.body.length).toEqual(afterResponse.body.length);
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
    const fakeOfferResponse = await request(server)
      .post(`${ROOT_PATH}`)
      .send(offerMock);

    const fakeID = fakeOfferResponse.body.id;
    fakeIDs.push(fakeID);

    const fakeOffer = Object.assign({}, offerMock, {title: `Fake Title`});
    const updateResponse = await request(server)
      .put(`${ROOT_PATH}/${fakeID}`)
      .send(fakeOffer);

    const offerResponse = await request(server).get(`${ROOT_PATH}/${fakeID}`);

    expect(updateResponse.status).toBe(HttpStatusCode.OK);
    expect(updateResponse.body.id).toBe(fakeID);
    expect(updateResponse.body.title).toBe(fakeOffer.title);
    expect(offerResponse.body.title).toBe(fakeOffer.title);
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
    const fakeOfferResponse = await request(server)
      .post(`${ROOT_PATH}`)
      .send(offerMock);

    const fakeID = fakeOfferResponse.body.id;
    fakeIDs.push(fakeID);

    const deleteResponse = await request(server)
      .delete(`${ROOT_PATH}/${fakeID}`);

    const offerResponse = await request(server).get(`${ROOT_PATH}/${fakeID}`);

    expect(deleteResponse.status).toBe(HttpStatusCode.OK);
    expect(deleteResponse.body.id).toBe(fakeID);
    expect(offerResponse.status).toBe(HttpStatusCode.NOT_FOUND);
  });
});

describe(`Test ${ROOT_PATH}/:offerID/comments`, () => {
  let fakeID;
  let commentPath;

  beforeAll(async () => {
    const fakeOfferResponse = await request(server).post(ROOT_PATH).send(offerMock);
    fakeID = fakeOfferResponse.body.id;
    fakeIDs.push(fakeID);

    commentPath = `${ROOT_PATH}/${fakeID}/comments`;
  });

  it(`should return comments when GET method and offerID is right`, async () => {
    const res = await request(server).get(commentPath);
    expect(res.status).toBe(HttpStatusCode.OK);
    expect(res.body).toHaveLength(0);
  });

  it(`should return updated offer when POST method and sent comment is valid`, async () => {
    const fakeComment = `Fake comment`;
    const res = await request(server).post(commentPath).send({'text': fakeComment});
    expect(res.status).toBe(HttpStatusCode.CREATED);
    expect(res.body.comments[0].text).toBe(fakeComment);
  });

  it(`should return 400 when POST method and sent comment is not valid`, async () => {
    const beforeResponse = await request(server).get(commentPath);
    const res = await request(server).post(commentPath).send({'isValid': false});
    const afterResponse = await request(server).get(commentPath);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(beforeResponse.body.length).toBe(afterResponse.body.length);
  });

  it(`should return a new comment when GET method and commentID is right`, async () => {
    const fakeComment = `Fake comment`;
    const res = await request(server).post(commentPath).send({'text': fakeComment});
    const fakeComments = res.body.comments;
    const fakeCommentID = fakeComments[fakeComments.length - 1].id;

    const commentResponse = await request(server).get(`${commentPath}/${fakeCommentID}`);
    expect(commentResponse.status).toBe(HttpStatusCode.OK);
    expect(commentResponse.body.id).toBe(fakeCommentID);
  });

  it(`should return an offer with removed comment when DELETE method and commentID is right`, async () => {
    const fakeComment = `Fake comment`;
    const res = await request(server).post(commentPath).send({'text': fakeComment});
    const fakeComments = res.body.comments;
    const fakeCommentID = fakeComments[fakeComments.length - 1].id;

    const deleteResponse = await request(server).delete(`${commentPath}/${fakeCommentID}`);

    expect(deleteResponse.status).toBe(HttpStatusCode.OK);
    expect(deleteResponse.body.comments.length + 1).toBe(fakeComments.length);
  });
});
