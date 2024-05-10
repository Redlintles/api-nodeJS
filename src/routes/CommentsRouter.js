"use strict";
var express = require("express");
var router = express.Router();
var createComment = require("../controllers/Comments/createComment");
router.post("/add", createComment);
module.exports = router;
