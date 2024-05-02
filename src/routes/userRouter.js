"use strict";
var express = require("express");
var router = express.Router();
var createUser = require("../controllers/Users/createUser");
router.get("/add", createUser);
module.exports = router;
