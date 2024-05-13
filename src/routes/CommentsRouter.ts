const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const createComment = require("../controllers/Comments/createComment");
const deleteCommentById = require("../controllers/Comments/deleteCommentById");
const getCommentById = require("../controllers/Comments/getCommentById");
const editComment = require("../controllers/Comments/editComment");

router.use(auth);
router.post("/add", createComment);
router.delete("/deleteById", deleteCommentById);
router.get("/getById", getCommentById);
router.put("/editById", editComment);
module.exports = router;
