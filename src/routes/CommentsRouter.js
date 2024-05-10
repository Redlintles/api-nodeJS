"use strict";
var express = require("express");
var router = express.Router();
var createComment = require("../controllers/Comments/createComment");
var deleteCommentById = require("../controllers/Comments/deleteCommentById");
router.post("/add", createComment);
router.delete("/deleteById", deleteCommentById);
module.exports = router;
