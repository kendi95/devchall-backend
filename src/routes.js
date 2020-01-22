const express = require("express");
const route = express.Router();

const UserController = require("./controllers/UserController");

route.post("/signup", UserController.store);
route.post("/signin", UserController.index);

route.get("/profile", UserController.show);
route.put("/profile", UserController.update);

module.exports = route;