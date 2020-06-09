'use strict';

module.exports = {
  DATA_SERVER_PORT: 3000,
  DEFAULT_PORT: 8080,
  TIMEOUT: 5000,
  HttpStatusCode: {
    NOT_FOUND: 404,
    OK: 200,
    SERVER_ERROR: 500,
    CREATED: 201,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
  },

  OfferTypeName: {
    offer: `Куплю`,
    sale: `Продам`
  },

  OfferType: {
    sell: `offer`,
    buy: `sale`,
  },

  CARD_COLORS: [
    `color01`,
    `color02`,
    `color03`,
    `color04`,
    `color05`,
    `color06`,
    `color07`,
    `color08`,
    `color09`,
    `color10`,
    `color11`,
    `color12`,
    `color13`,
    `color14`,
    `color15`,
    `color16`,
  ],

  CATEGORIES: [
    `Аккордеоны, гармони, баяны`,
    `Вещи знаменитостей, автографы`,
    `Грампластинки`,
    `Домашние растения`,
    `Комнатные животные`,
    `Этикетки, бутылки, пробки`,
  ],

  CategoryProperties: {
    [`Аккордеоны, гармони, баяны`]: {
      name: `Аккордеоны, гармони, баяны`,
      img: `cat`,
    },

    [`Вещи знаменитостей, автографы`]: {
      name: `Вещи знаменитостей, автографы`,
      img: `cat02`,
    },

    [`Грампластинки`]: {
      name: `Грампластинки`,
      img: `cat03`,
    },

    [`Этикетки, бутылки, пробки`]: {
      name: `Этикетки, бутылки, пробки`,
      img: `cat04`,
    },

    [`Комнатные животные`]: {
      name: `Комнатные животные`,
      img: `cat05`,
    },

    [`Домашние растения`]: {
      name: `Домашние растения`,
      img: `cat06`,
    },
  },

  ValueCheck: {
    title: (value) => value.length < 10 || value.length > 100
      ? `must be between 10 and 100 characters` : ``,
    description: (value) => value.length < 50 || value.length > 1000
      ? `must be between 50 and 1000 characters` : ``,
    sum: (value) => value < 100 || value > 10000000
      ? `must be between 100 and 10000000 rubles` : ``,
  },

  NO_PICTURE: `no-picture.jpg`
};
