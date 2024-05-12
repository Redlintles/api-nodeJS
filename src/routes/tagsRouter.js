"use strict";
var express = require("express");
var router = express.Router();
var createTag = require("../controllers/Tags/createTag");
router.post("/add", createTag);
module.exports = router;
