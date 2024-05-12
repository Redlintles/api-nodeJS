const express = require("express");
const router = express.Router();

const createTag = require("../controllers/Tags/createTag");

router.post("/add", createTag);

module.exports = router;
