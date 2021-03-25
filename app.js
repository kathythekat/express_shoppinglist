const { request } = require("express");
const express = require("express");
const app = express();
const { items } = require("./fakeDb");

const { NotFoundError } = require("./expressError");

const itemsRoutes = require("./itemsRoutes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app
