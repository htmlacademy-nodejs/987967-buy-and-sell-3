'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);

let server;
const ROOT_PATH = `/api/offers`;

const validOffer = {
  "title": `Шервуд Том. Остров Локк. Псевдо бпнф`,
  "picture": `item08.jpg`,
  "description": `Это настоящая находка для коллекционера!\nДоставка по всей России Бесплатно!Самовывоз`,
  "type": `sale`,
  "sum": 42788,
  "category": `Ролики и скейтбординг`
};

const invalidOffer = {
  "picture": `item08.jpg`,
  "description": `Это настоящая находка для коллекционера!\nДоставка по всей России Бесплатно!Самовывоз`,
  "type": `sale`,
  "sum": 42788,
  "category": `Ролики и скейтбординг`
};

const validComment = {
  "text": `Comment`
};

const invalidComment = {
  "notext": `Comment`
};

const mockOffer = {
  id: `id-1`,
  title: `title1`,
  picture: `picture1`,
  description: `description1`,
  type: `sale`,
  sum: 11111,
  category: `category1`,
  comments: [
    {
      "id": `comment-id-1`,
      "text": `comment11`
    }
  ]
};

const mockGetAll = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockGetOne = jest.fn((id) => {
  if (id !== `id-1`) {
    return null;
  }

  return mockOffer;
});

const mockCommentGetAll = jest.fn();
const mockCommentCreate = jest.fn();
const mockCommentUpdate = jest.fn();
const mockCommentDelete = jest.fn();
const mockCommentGetOne = jest.fn((offer, id) => {
  if (id === `comment-id-1`) {
    return {
      "id": `comment-id-1`,
      "text": `comment11`
    };
  }

  return null;
});

jest.mock(`../data-service/offer-service`, () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: mockCreate,
  getOne: mockGetOne,
  update: mockUpdate,
  delete: mockDelete,
})));

jest.mock(`../data-service/comment-service`, () => jest.fn().mockImplementation(() => ({
  getAll: mockCommentGetAll,
  create: mockCommentCreate,
  getOne: mockCommentGetOne,
  update: mockCommentUpdate,
  delete: mockCommentDelete,
})));

beforeAll(async () => {
  server = await createServer();
});

beforeEach(() => {
  mockGetAll.mockClear();
  mockCreate.mockClear();
  mockGetOne.mockClear();
  mockUpdate.mockClear();
  mockDelete.mockClear();

  mockCommentGetAll.mockClear();
  mockCommentCreate.mockClear();
  mockCommentGetOne.mockClear();
  mockCommentUpdate.mockClear();
  mockCommentDelete.mockClear();
});

describe(`Test REST "${ROOT_PATH}"`, () => {
  it(`should return status 200 if GET method`, async () => {
    const res = await request(server).get(ROOT_PATH);
    expect(res.status).toBe(200);
  });

  it(`should call getAll() once if GET method`, async () => {
    await request(server).get(ROOT_PATH);
    expect(mockGetAll).toHaveBeenCalledTimes(1);
  });

  it(`should return status 201 if POST method and offer data is valid`, async () => {
    const res = await request(server).post(ROOT_PATH).send(validOffer);
    console.log(res.text);

    expect(res.status).toBe(201);
  });

  it(`should call create() once with offer if POST method and offer data is valid`, async () => {
    await request(server).post(ROOT_PATH).send(validOffer);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(validOffer);
  });

  it(`should return status 400 if POST method and offer data is not valid`, async () => {
    const res = await request(server).post(ROOT_PATH).send(invalidOffer);
    expect(res.status).toBe(400);
  });

  it(`should not call create() if POST method and offer data is not valid`, async () => {
    await request(server).post(ROOT_PATH).send(invalidOffer);
    expect(mockCreate).toHaveBeenCalledTimes(0);
  });
});

describe(`Test REST "${ROOT_PATH}/:offerID"`, () => {
  it(`should respond with status of 200 and call getOne(offerID)
  if GET method and offerID exists`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/id-1`);
    expect(res.status).toBe(200);
    expect(mockGetOne).toHaveBeenCalledTimes(1);
    expect(mockGetOne).toHaveBeenCalledWith(`id-1`);
  });

  it(`should respond with status of 404
  if GET method and offerID doesn't exists`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/wrong-id`);
    expect(res.status).toBe(404);
  });

  it(`should respond with status of 200 and call udpate(offer)
  if PUT method and offerID exists and offer is valid`, async () => {
    const res = await request(server).put(`${ROOT_PATH}/id-1`).send(validOffer);
    expect(res.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({...{id: `id-1`}, ...validOffer});
  });

  it(`should respond with status of 400 and not call udpate()
  if PUT method and offer is invalid`, async () => {
    const res = await request(server).put(`${ROOT_PATH}/id-1`).send(invalidOffer);
    expect(res.status).toBe(400);
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });

  it(`should respond with status of 404 and not call udpate()
  if PUT method and offerID doesn't exist`, async () => {
    const res = await request(server).put(`${ROOT_PATH}/wrong-id`).send(validOffer);
    expect(res.status).toBe(404);
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });

  it(`should respond with status of 200 and call delete(offerID)
  if DELETE method and offerID exists`, async () => {
    const res = await request(server).delete(`${ROOT_PATH}/id-1`);
    expect(res.status).toBe(200);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(`id-1`);
  });

  it(`should respond with status of 404 and not call delete()
  if DELETE method and offerID doesn't exist`, async () => {
    const res = await request(server).delete(`${ROOT_PATH}/wrong-id`);
    expect(res.status).toBe(404);
    expect(mockDelete).toHaveBeenCalledTimes(0);
  });
});

describe(`Test REST "${ROOT_PATH}/:offerID/comments"`, () => {
  it(`should respond with status of 200 and call commentService.getAll() 
  if GET method and offerID exists`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/id-1/comments`);
    expect(res.status).toBe(200);
    expect(mockCommentGetAll).toHaveBeenCalledTimes(1);
  });

  it(`should respond with status of 404 and not call commentService.getAll() 
  if GET method and offerID doesn't exist`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/wrong-id/comments`);
    expect(res.status).toBe(404);
    expect(mockCommentGetAll).toHaveBeenCalledTimes(0);
  });

  it(`should respond with status of 201 and call commentService.create(comment) 
  if POST method and offerID exists and comment is valid`, async () => {
    const res = await request(server).post(`${ROOT_PATH}/id-1/comments`).send(validComment);
    expect(res.status).toBe(201);
    expect(mockCommentCreate).toHaveBeenCalledTimes(1);
    expect(mockCommentCreate).toHaveBeenCalledWith(mockOffer, validComment);
  });

  it(`should respond with status of 404 and not call commentService.create() 
  if POST method and offerID doesn't exist`, async () => {
    const res = await request(server).post(`${ROOT_PATH}/wrong-id/comments`).send(validComment);
    expect(res.status).toBe(404);
    expect(mockCommentCreate).toHaveBeenCalledTimes(0);
  });

  it(`should respond with status of 400 and not call commentService.create() 
  if POST method and offerID comment is invalid`, async () => {
    const res = await request(server).post(`${ROOT_PATH}/id-1/comments`).send(invalidComment);
    expect(res.status).toBe(400);
    expect(mockCommentCreate).toHaveBeenCalledTimes(0);
  });
});

describe(`Test REST "${ROOT_PATH}/:offerID/comments/:commentID"`, () => {
  it(`should respond with status of 200 and call commentService.getOne(commentID) 
  if GET method and offerID exists and commentID exists`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/id-1/comments/comment-id-1`);
    expect(res.status).toBe(200);
    expect(mockCommentGetOne).toHaveBeenCalledTimes(1);
    expect(mockCommentGetOne).toHaveBeenCalledWith(mockOffer, `comment-id-1`);
  });

  it(`should respond with status of 404 and not call commentService.getOne() 
  if GET method and offerID doesn't exist`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/wrong-id/comments/comment-id-1`);
    expect(res.status).toBe(404);
    expect(mockCommentGetOne).toHaveBeenCalledTimes(0);
  });

  it(`should respond with status of 404 and not call commentService.getOne() 
  if GET method and commentID doesn't exist`, async () => {
    const res = await request(server).get(`${ROOT_PATH}/id-1/comments/wrong-id`);
    expect(res.status).toBe(404);
  });

  it(`should call commentService.delete(commentID) 
  if DELETE method and offerID exists and commentID exists`, async () => {
    await request(server).delete(`${ROOT_PATH}/id-1/comments/comment-id-1`);
    expect(mockCommentDelete).toHaveBeenCalledTimes(1);
    expect(mockCommentDelete).toHaveBeenCalledWith(mockOffer, `comment-id-1`);
  });

  it(`should respond with status of 404 and not call commentService.delete() 
  if DELETE method and offerID doesn't exist`, async () => {
    await request(server).delete(`${ROOT_PATH}/wrong-id/comments/comment-id-1`);
    expect(mockCommentDelete).toHaveBeenCalledTimes(0);
  });
});
