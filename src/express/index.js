'use strict';

const express = require(`express`);
const {DEFAULT_PORT} = require(`./const`);

const {mainRouter} = require(`./routes/main`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {offersRouter} = require(`./routes/offers`);
const {registerRouter} = require(`./routes/register`);
const {searchRouter} = require(`./routes/search`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(DEFAULT_PORT);
