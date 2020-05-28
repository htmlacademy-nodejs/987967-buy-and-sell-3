'use strict';

const {HttpStatusCode} = require(`../const`);

const REQUIRED_FIELD = [`text`];

const validateComment = (req, res, next) => {
  const comment = req.body;

  REQUIRED_FIELD.forEach((it) => {
    if (!(it in comment)) {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong comment data. Field "${it}" not found`);
    }
  });

  next();
};

module.exports = validateComment;
