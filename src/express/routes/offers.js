'use strict';

const { Router } = require(`express`);
const multer = require(`multer`);
const { DataServer } = require(`../data-server`);
const { offerToRaw, adaptOffer } = require(`../utils`);

const offersRouter = new Router();
const upload = multer({ dest: `src/express/public/img` });
const dataServer = new DataServer();

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const categories = await dataServer.getCategories();
  const rawOffer = offerToRaw({ ...req.body, file: req.file }, categories);
  
  try {
    await dataServer.createOffer(rawOffer);
  } catch (err) {
    console.error(`Error creating a new ticket: `);

    const checkedCategories = categories.map(category => ({
      ...category,
      checked: rawOffer.categories.some(it => it.id === category.id)
    }))

    res.render(`new-ticket`, {
      categories: checkedCategories,
      buttonName: `Опубликовать`,
      offer: adaptOffer(rawOffer)
    });
    return;
  }

  res.redirect(`/my`);
});

offersRouter.get(`/add`, async (req, res) => {
  const categories = await dataServer.getCategories();

  res.render(`new-ticket`, {
    categories: categories,
    buttonName: `Опубликовать`,
    offer: {
      title: ``,
      description: ``,
      sum: ``,
    }
  });
});

offersRouter.get(`/:id`, async (req, res) => {
  res.render(`ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  let offer;
  let categories;
  try {
    [offer, categories] = await Promise.all([dataServer.getOffer(id), dataServer.getCategories()]);
  } catch (err) {
    res.render(`errors/400.pug`);
    return
  };

  const checkedCategories = categories.map(category => ({
    ...category,
    checked: offer.categories.some(it => it.id === category.id)
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
