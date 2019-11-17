const express = require("express");
const route = express.Router();

const UserController = require("./controllers/UserController");

route.post("/signup", UserController.store);
route.post("/signin", UserController.index);

module.exports = route;