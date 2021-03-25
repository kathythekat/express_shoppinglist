const { request } = require("express");
const express = require("express");
const app = express();
const { items } = require("./fakeDb");

const itemsRoutes = require("./itemsRoutes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);

module.exports = app
