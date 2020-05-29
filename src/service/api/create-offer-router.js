'use strict';

const {HttpStatusCode} = require(`../const`);
const {findOffer, validateOffer, validateComment} = require(`../middlewares`);
const {Router} = require(`express`);

const createOfferRouter = (offerService, commentService) => {
  const router = new Router();
  const findOfferMiddleware = findOffer(offerService);

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(offerService.getAll());
  });

  router.get(`/:offerID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    res.status(HttpStatusCode.OK).json(offer);
  });

  router.post(`/`, validateOffer, (req, res) => {
    const offer = req.body;
    res.status(HttpStatusCode.CREATED).json(offerService.create(offer));
  });

  router.delete(`/:offerID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    const deletedOffer = offerService.delete(offer.id);
    res.status(HttpStatusCode.OK).json(deletedOffer);
  });

  router.put(`/:offerID`, [findOfferMiddleware, validateOffer], (req, res) => {
    const {offer} = res.locals;
    const updatedOffer = Object.assign({id: offer.id}, req.body);
    res.status(HttpStatusCode.OK).json(offerService.update(updatedOffer));
  });

  router.get(`/:offerID/comments`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    res.status(HttpStatusCode.OK).json(commentService.getAll(offer));
  });

  router.post(`/:offerID/comments`, [findOfferMiddleware, validateComment], (req, res) => {
    const {offer} = res.locals;
    const comment = req.body;
    const updatedOffer = commentService.create(offer, comment);

    res.status(HttpStatusCode.CREATED).json(offerService.update(updatedOffer));
  });

  router.delete(`/:offerID/comments/:commentID`, [findOfferMiddleware], (req, res) => {
    const {offer} = res.locals;
    const {commentID} = req.params;
    const updatedOffer = commentService.delete(offer, commentID);

    if (!updatedOffer) {
      res.status(HttpStatusCode.NOT_FOUND).send(`Comment with id="${commentID}" not found`);
    }

    res.status(HttpStatusCode.OK).json(offerService.update(updatedOffer));
  });

  return router;
};

module.exports = {
  createOfferRouter
};
