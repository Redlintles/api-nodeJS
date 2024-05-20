"use strict";
var express = require("express");
var router = express.Router();
var createGroup = require("../controllers/Group/createGroup");
router.post("/add", createGroup);
module.exports = router;
