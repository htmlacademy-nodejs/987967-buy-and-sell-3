'use strict';

const {HttpStatusCode} = require(`../const`);

const REQUIRED_FIELDS = [`text`];

const validateComment = (req, res, next) => {
  const comment = req.body;
  if (!comment) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong comment data. Comment is empty`);
    return;
  }

  const isValid = REQUIRED_FIELDS.reduce((acc, cur) => {
    return acc && (cur in comment);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Wrong comment data. Not all fields are found`);
    return;
  }

  next();
};

module.exports = validateComment;
