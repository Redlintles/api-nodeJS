"use strict";
var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var createAdmin = require("../controllers/Admin/createAdmin");
router.use(auth);
router.post("/add", createAdmin);
module.exports = router;
