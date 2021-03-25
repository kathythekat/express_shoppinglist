const express = require("express");
const { NotFoundError } = require("./expressError");

const db = require("./fakeDb");
const router = new express.Router();
// const { NotFoundError } = require("./expressError");


//GET items: get list of grocery items //
router.get("/", function(req, res, next) {
  return res.json({items: db.items});
});

//POST items: add to items array from json body
router.post("/", function (req, res, next) {
  if (req.body.name === undefined || req.body.price === undefined) {
    return next(new NotFoundError());
  }
  db.items.push({name: req.body.name, price: req.body.price});
  return res.json(
    { added:
      { name:req.body.name,
        price: req.body.price
      }
    });
});

//GET item by passing in name in query param
router.get("/:name", function(req, res, next) {
  const itemName = req.params.name;
  let item = db.items.find(item => item.name === itemName);
  if (item === undefined) {
    return next(new NotFoundError())
  }
  return res.json(item);
})

//PATCH: change item name or price based on name in query param
router.patch("/:name", function(req, res, next) {
  let oldName = req.params.name;
  if (!(db.items.find(item => item.name === oldName))) {
    return next(new NotFoundError());
  }
  let newName = req.body.name;
  let price = req.body.price;
 
  let itemIndex = db.items.findIndex(item => item.name === oldName);

  db.items[itemIndex].name = newName;
  db.items[itemIndex].price = price;
  return res.json(
    {updated: {name: newName, price: price}});
})

//DELETE: delete item 
router.delete("/:name", function(req, res, next) {
  let itemToRemove = req.params.name;
  if (!(db.items.find(item => item.name === itemToRemove))) {
    return next(new NotFoundError());
  }
  let itemIndex = db.items.findIndex(item => item.name === itemToRemove);
  db.items.splice(itemIndex, 1);
  return res.json({message: "Deleted"});
})


module.exports = router;