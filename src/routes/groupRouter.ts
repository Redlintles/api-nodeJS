const express = require("express");
const router = express.Router();
const createGroup = require("../controllers/Group/createGroup");

router.post("/add", createGroup);

module.exports = router;
