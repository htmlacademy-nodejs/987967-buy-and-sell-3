'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {validateTicket} = require(`../utils`);
const {CATEGORIES} = require(`../const`);
const { FormToServiceAdapter, ServiceToExpressAdapter } = require(`../data-adapter`);
const {getLogger, LogMessage, LoggerName} = require(`../logger`);

const offersRouter = new Router();
const upload = multer({dest: `src/express/public/img`});
const dataServer = new DataServer();
const logger = getLogger(LoggerName.APP_API);

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const offer = FormToServiceAdapter.getOffer({...req.body}, req.file);

  try {
    // throw new Error(`123`)
    await dataServer.createOffer(offer);
  } catch (err) {
    logger.error(`Error creating a new ticket: ${err}`);

    const ticket = ServiceToExpressAdapter.getOffer(offer);

    logger.info(LogMessage.getEndRequest(req.url))
    res.render(`new-ticket`, {
      categories: CATEGORIES,
      buttonName: `Опубликовать`,
      offer: ticket,
      errorMessage: `Error creating offer, please try again later`,
      validateMessage: validateTicket(ticket)
    });
    return;
  }

  logger.info(LogMessage.getEndRequest(req.url))
  res.redirect(`/my`);
});

offersRouter.get(`/add`, async (req, res) => {
  const emptyOffer = {
    title: ``,
    description: ``,
    sum: 0,
    categoryIndexes: [],
  };

  logger.info(LogMessage.getEndRequest(req.url))
  res.render(`new-ticket`, {
    categories: CATEGORIES,
    buttonName: `Опубликовать`,
    offer: emptyOffer,
    validateMessage: validateTicket(emptyOffer),
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  logger.info(LogMessage.getEndRequest(req.url))
  res.render(`ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  logger.info(LogMessage.getEndRequest(req.url))
  res.render(`category`);
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  let offer;
  try {
    offer = await dataServer.getOffer(id);
  } catch (err) {
    logger.error(LogMessage.getError(err))
    res.render(`errors/400.pug`);
    return;
  }

  logger.info(LogMessage.getEndRequest(req.url))
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
