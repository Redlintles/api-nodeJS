"use strict";
var express = require("express");
var router = express.Router();
var createTag = require("../controllers/Tags/createTag");
var deleteTag = require("../controllers/Tags/deleteTag");
router.post("/add", createTag);
router.delete("/delete", deleteTag);
module.exports = router;
