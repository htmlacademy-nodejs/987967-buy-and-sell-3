'use strict';

const express = require(`express`);
const path = require(`path`);
const {DEFAULT_PORT} = require(`./const`);

const {mainRouter} = require(`./routes/main`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {offersRouter} = require(`./routes/offers`);
const {registerRouter} = require(`./routes/register`);
const { searchRouter } = require(`./routes/search`);
const { logger, LogMessage, getLogger, LoggerName } = require(`./logger`);

const app = express();
const apiLogger = getLogger(LoggerName.APP_API);

app.use(express.static(path.resolve(__dirname, `public`)));

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, `templates`));

app.use((req, res, next) => {
  apiLogger.info(LogMessage.getStartRequest(req.url));
  next()
});

app.use(`/`, mainRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.use((req, res) => {
  res.status(404).render(`errors/400.pug`)
  apiLogger.error(LogMessage.getUnknownRoute(req.url));
});

app.use((err, req, res, next) => {
  const errorMessage = err.msg ? `${err.msg}: ${err.filename}, line: ${err.line}` : err;
  logger.error(LogMessage.getError(errorMessage))

  res.status(500).render(`errors/500.pug`);
  next();
});

try {
  app.listen(DEFAULT_PORT);
  logger.info(LogMessage.getCreateServer(DEFAULT_PORT));
} catch (err) {
  logger.error(LogMessage.getErrorCreatingServer(err))
}
