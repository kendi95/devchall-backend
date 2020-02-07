const express = require("express");
const route = express.Router();

const UserController = require("./controllers/UserController");
const JWTController = require("./controllers/JWTController");
const RecoveryController = require("./controllers/RecoveryController");

route.post("/signup", UserController.store);
route.post("/signin", UserController.index);

route.get("/profile", UserController.show);
route.put("/profile", UserController.update);

route.patch("/upload_imageURL", UserController.uploadImageURL);

route.get("/validated_token", JWTController.isTokenValideted);

route.get("/confirm_email", RecoveryController.findByEmail);
route.patch("/reset_password", RecoveryController.resetPassword);

module.exports = route;