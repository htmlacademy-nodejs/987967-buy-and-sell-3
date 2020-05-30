'use strict';

const {AbstractService} = require(`./abstract-service`);

class offerService extends AbstractService {
  constructor(offers) {
    super()
    this.setItems(offers);
    this.setTemplateItem({
      comments: []
    })
  }

  search(query) {
    const regexp = new RegExp(query, `i`);
    return this.getItems().filter((it) => regexp.test(it.title));
  }
}

module.exports = offerService;
