"use strict";
var express = require("express");
var router = express.Router();
var createUser = require("../controllers/Users/createUser");
var getUserById = require("../controllers/Users/getUserById");
var deleteById = require("../controllers/Users/deleteById");
var editById = require("../controllers/Users/editById");
var auth = require("../middlewares/auth");
router.use(auth);
router.post("/add", createUser);
router.get("/getById", getUserById);
router.delete("/deleteById", deleteById);
router.put("/editById", editById);
module.exports = router;
