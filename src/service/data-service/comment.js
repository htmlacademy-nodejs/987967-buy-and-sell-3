'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../const`);

class CommentService {
  getAll(offer) {
    return offer.comments;
  }

  delete(offer, commentID) {
    const deletedComment = offer.comments.find((it) => it.id === commentID);
    if (!deletedComment) {
      return null;
    }

    return Object.assign({}, offer, {comments: offer.comments.filter((it) => it.id !== commentID)});
  }

  create(offer, comment) {
    const newComment = Object.assign({id: nanoid(MAX_ID_LENGTH)}, comment);
    const updatedOffer = Object.assign({}, offer);
    updatedOffer.comments.push(newComment);

    return updatedOffer;
  }
}

module.exports = CommentService;
