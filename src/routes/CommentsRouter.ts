const express = require("express");
const router = express.Router();

const createComment = require("../controllers/Comments/createComment");
const deleteCommentById = require("../controllers/Comments/deleteCommentById");

router.post("/add", createComment);
router.delete("/deleteById", deleteCommentById);
module.exports = router;
