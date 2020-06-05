'use strict';

const {AbstractService} = require(`./abstract-service`);

class CommentService extends AbstractService {
  constructor() {
    super();
    this.setTemplateItem({});
  }

  getAll(offer) {
    this.setItems(offer.comments);
    return super.getAll();
  }

  getOne(offer, id) {
    this.setItems(offer.comments);
    return super.getOne(id);
  }

  delete(offer, commentID) {
    this.setItems(offer.comments);
    if (super.delete(commentID)) {
      const updatedOffer = {...offer, ...{comments: this.getItems()}};
      return updatedOffer;
    }

    return null;
  }

  create(offer, comment) {
    this.setItems(offer.comments);
    super.create(comment);
    const updatedOffer = {...offer, ...{comments: this.getItems()}};
    return updatedOffer;
  }

  update() {
    throw new Error(`Comment could't be updated`);
  }
}

module.exports = CommentService;
