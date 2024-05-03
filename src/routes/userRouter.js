"use strict";
var express = require("express");
var router = express.Router();
var createUser = require("../controllers/Users/createUser");
var getUserById = require("../controllers/Users/getUserById");
router.post("/add", createUser);
router.get("/getUserById", getUserById);
module.exports = router;
