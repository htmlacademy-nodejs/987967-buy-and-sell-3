'use strict';

const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../const`);

class AbstractService {
  constructor() {
    // throw new Error(`Can't run a constructor of abstract class`)
  }

  setItems(items) {
    this._items = items;
  }

  getItems() {
    return this._items;
  }

  setTemplateItem(item) {
    this._templateItem = item;
  }

  getAll() {
    return this._items
  }

  getOne(id) {
    return this._items.find(it => it.id === id)
  }

  create(item) {
    const newItem = {
      id: nanoid(MAX_ID_LENGTH),
      ...this._templateItem,
      ...item
    };

    this._items.push(newItem);

    return newItem;
  }

  update(item) {
    const index = this._items.findIndex(it => it.id === item.id);
    if (index === -1) {
      return null
    };

    const newItem = { ...this._items[index], ...item };
    this._items[index] = newItem;

    return newItem
  }

  delete(id) {
    const index = this._items.findIndex(it => it.id === id);
    if (index === -1) {
      return null
    };

    const deletedItem = this._items[index];
    this._items = this._items.filter(it => it.id !== id);

    return deletedItem
  }
};

module.exports = {
  AbstractService
}