'use strict';

const {HttpStatusCode, LoggerName} = require(`../const`);
const {findOffer, validateOffer, validateComment} = require(`../middlewares`);
const {Router} = require(`express`);
const {getLogger, LogMessage} = require(`../logger`);

const apiLogger = getLogger({name: LoggerName.API});

const createOfferRouter = (offerService, commentService) => {
  const router = new Router();
  const findOfferMiddleware = findOffer(offerService);

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(offerService.getAll());
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.get(`/:offerID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    res.status(HttpStatusCode.OK).json(offer);
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.post(`/`, validateOffer, (req, res) => {
    const offer = req.body;
    res.status(HttpStatusCode.CREATED).json(offerService.create(offer));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.CREATED, req.originalUrl));
  });

  router.delete(`/:offerID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    const deletedOffer = offerService.delete(offer.id);
    res.status(HttpStatusCode.OK).json(deletedOffer);
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.put(`/:offerID`, [findOfferMiddleware, validateOffer], (req, res) => {
    const {offer} = res.locals;
    const updatedOffer = Object.assign({id: offer.id}, req.body);
    res.status(HttpStatusCode.OK).json(offerService.update(updatedOffer));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.get(`/:offerID/comments`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    res.status(HttpStatusCode.OK).json(commentService.getAll(offer));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.post(`/:offerID/comments`, [findOfferMiddleware, validateComment], (req, res) => {
    const {offer} = res.locals;
    const comment = req.body;
    const updatedOffer = commentService.create(offer, comment);

    res.status(HttpStatusCode.CREATED).json(offerService.update(updatedOffer));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.CREATED, req.originalUrl));
  });

  router.get(`/:offerID/comments/:commentID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    const {commentID} = req.params;
    const comment = commentService.getOne(offer, commentID);

    if (!comment) {
      res.status(HttpStatusCode.NOT_FOUND).send(`Comment with id="${commentID}" not found`);
      apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.NOT_FOUND, req.originalUrl));
      return;
    }

    res.status(HttpStatusCode.OK).json(comment);
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  router.delete(`/:offerID/comments/:commentID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    const {commentID} = req.params;
    const updatedOffer = commentService.delete(offer, commentID);

    if (!updatedOffer) {
      res.status(HttpStatusCode.NOT_FOUND).send(`Comment with id="${commentID}" not found`);
      apiLogger.error(LogMessage.getEndRequest(HttpStatusCode.NOT_FOUND, req.originalUrl));
      return;
    }

    res.status(HttpStatusCode.OK).json(offerService.update(updatedOffer));
    apiLogger.info(LogMessage.getEndRequest(HttpStatusCode.OK, req.originalUrl));
  });

  return router;
};

module.exports = {
  createOfferRouter
};
