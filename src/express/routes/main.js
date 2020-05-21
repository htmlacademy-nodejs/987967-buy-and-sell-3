'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  res.render(`main.pug`);
});

module.exports = {
  mainRouter,
};
