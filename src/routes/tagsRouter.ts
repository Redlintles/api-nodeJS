const express = require("express");
const router = express.Router();

const createTag = require("../controllers/Tags/createTag");
const deleteTag = require("../controllers/Tags/deleteTag");
const auth = require("../middlewares/auth");

router.use(auth);
router.post("/add", createTag);
router.delete("/delete", deleteTag);

module.exports = router;
