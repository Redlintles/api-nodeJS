const express = require("express");
const router = express.Router();

const createComment = require("../controllers/Comments/createComment");

router.post("/add", createComment);

module.exports = router;
