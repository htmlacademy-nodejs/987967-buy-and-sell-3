'use strict';

const { Router } = require(`express`);
const multer = require(`multer`);
const { DataServer } = require(`../data-server`);
const { validateTicket } = require(`../utils`);
const { CATEGORIES } = require(`../const`);
const { FormToServiceAdapter, ServiceToExpressAdapter } = require(`../data-adapter`);

const offersRouter = new Router();
const upload = multer({ dest: `src/express/public/img` });
const dataServer = new DataServer();

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const offer = FormToServiceAdapter.getOffer({ ...req.body }, req.file);
  
  try {
    // throw new Error(`123`)
    await dataServer.createOffer(offer);
  } catch (err) {
    console.error(`Error creating a new ticket: ${err}`);

    const ticket = ServiceToExpressAdapter.getOffer(offer);

    res.render(`new-ticket`, {
      categories: CATEGORIES,
      buttonName: `Опубликовать`,
      offer: ticket,
      errorMessage: `Error creating offer, please try again later`,
      validateMessage: validateTicket(ticket)
    });
    return;
  }

  res.redirect(`/my`);
});

offersRouter.get(`/add`, async (req, res) => {
  const emptyOffer = {
    title: ``,
    description: ``,
    sum: 0,
    categoryIndexes: [],
  };

  res.render(`new-ticket`, {
    categories: CATEGORIES,
    buttonName: `Опубликовать`,
    offer: emptyOffer,
    validateMessage: validateTicket(emptyOffer),
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  res.render(`ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  let offer;
  try {
    offer = await dataServer.getOffer(id);
  } catch (err) {
    res.render(`errors/400.pug`);
    return
  };

  res.render(`ticket-edit`, {
    offer,
    categories: CATEGORIES,
    buttonName: `Сохранить`,
    validateMessage: validateTicket(offer)
  });
});

module.exports = {
  offersRouter,
};
