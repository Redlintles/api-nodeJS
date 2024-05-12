const express = require("express");
const router = express.Router();

const createAdmin = require("../controllers/Admin/createAdmin");

router.post("/add", createAdmin);
module.exports = router;
