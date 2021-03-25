const { request } = require("express");
const express = require("express");
const app = express();
const { items } = require("./fakeDb");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/items", function(req, res, next) {
  return res.json({items: items})
})

app.post("/items", function (req, res, next) {
  items.push({name: req.body.name, price: req.body.price});
  return res.json(
    {added:{name:req.body.name, price: req.body.price}});
})

app.get("/items/:name", function(req, res, next) {
  let itemName = req.params.name;
  let item = items.find(item => item.name === itemName)
  return res.json(item)
})

app.patch("/items/:name", function(req, res, next) {
  let oldName = req.params.name;
  let newName = req.body.name;
  let price = req.body.price;
 
  let itemIndex = items.findIndex(item => item.name === oldName);
  items[itemIndex].name = newName;
  items[itemIndex].price = price;
  return res.json(
    {updated: {name: newName, price: price}})

})

app.delete("/items/:name", function(req, res, next) {
  let itemToRemove = req.params.name;
  let itemIndex = items.findIndex(item => item.name === itemToRemove);
  items.splice(itemIndex, 1);
  return res.json({message: "Deleted"});

})

module.exports = app
