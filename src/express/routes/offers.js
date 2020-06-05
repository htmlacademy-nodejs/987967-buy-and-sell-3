'use strict';

const { Router } = require(`express`);
const multer = require(`multer`);
const { DataServer } = require(`../data-server`);
const { getAllCategories } = require(`../utils`);

const offersRouter = new Router();
const upload = multer({ dest: `uploads/` });
const dataServer = new DataServer();

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  
  res.redirect(`/my`);
});

offersRouter.get(`/add`, async (req, res) => {
  const allCategories = await getAllCategories();
  const checkedCategories = allCategories.map(it => ({
    name: it,
    checked: false,
  }));

  res.render(`new-ticket`, {
    categories: checkedCategories,
    buttonName: `Опубликовать`,
    offer: {
      title: ``,
      description: ``,
      sum: ``,
    }
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  let offer;
  try {
    offer = await dataServer.getOffer(id);
  } catch (err) {
    res.render(`errors/400.pug`);
    return
  };

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

  const allCategories = await getAllCategories();
  const checkedCategories = allCategories.map(it => ({
    name: it,
    checked: offer.category.name === it
  }))

  res.render(`ticket-edit`, {
    offer,
    categories: checkedCategories,
    buttonName: `Сохранить`,
  });
});

module.exports = {
  offersRouter,
};
