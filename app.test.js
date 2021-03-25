process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");

let db = require("./fakeDb");

beforeEach(function() {
  db.items.push({name: 'milk', price: '3'});
  db.items.push({name: 'eggs', price: '5'});
});

afterEach(function() {
  db.items = [];
});

describe("GET /items", function() {
  test("Gets list of all items", async function() {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({"items":[{"name": "milk", "price": "3"}, {"name":"eggs", "price": "5"}]
    });
  });

  test("Responds with 200 on successful items", async function() {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toEqual(200);
  });
});