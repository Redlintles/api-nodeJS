"use strict";
var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
});
var auth = require("../middlewares/auth");
var editProfile = require("../controllers/Profile/editProfile");
router.use(auth);
router.post("/edit", upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]), editProfile);
module.exports = router;
