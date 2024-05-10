const express = require("express");
const router = express.Router();

const createComment = require("../controllers/Comments/createComment");
const deleteCommentById = require("../controllers/Comments/deleteCommentById");
const getCommentById = require("../controllers/Comments/getCommentById");
router.post("/add", createComment);
router.delete("/deleteById", deleteCommentById);
router.get("/getById", getCommentById);
module.exports = router;
