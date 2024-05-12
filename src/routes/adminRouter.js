"use strict";
var express = require("express");
var router = express.Router();
var createAdmin = require("../controllers/Admin/createAdmin");
router.post("/add", createAdmin);
module.exports = router;
