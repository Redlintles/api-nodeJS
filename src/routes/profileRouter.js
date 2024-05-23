"use strict";
var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
});
var editProfile = require("../controllers/Profile/editProfile");
router.post("/edit", upload.single("image"), editProfile);
module.exports = router;
