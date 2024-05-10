"use strict";
var express = require("express");
var router = express.Router();
var createComment = require("../controllers/Comments/createComment");
var deleteCommentById = require("../controllers/Comments/deleteCommentById");
var getCommentById = require("../controllers/Comments/getCommentById");
var editComment = require("../controllers/Comments/editComment");
router.post("/add", createComment);
router.delete("/deleteById", deleteCommentById);
router.get("/getById", getCommentById);
router.put("/editById", editComment);
module.exports = router;
