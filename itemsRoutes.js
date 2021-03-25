const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();


//GET items: get list of grocery items //
router.get("/", function(req, res, next) {
  return res.json({items: db.items});
});

//POST items: add to items array from json body
router.post("/", function (req, res, next) {
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
  let item = db.items.find(item => item.name === itemName)
  return res.json(item);
})

//PATCH: change item name or price based on name in query param
router.patch("/:name", function(req, res, next) {
  let oldName = req.params.name;
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
  let itemIndex = db.items.findIndex(item => item.name === itemToRemove);
  db.items.splice(itemIndex, 1);
  return res.json({message: "Deleted"});
})


module.exports = router;