"use strict";
var express = require("express");
var router = express.Router();
var createGroup = require("../controllers/Group/createGroup");
var multer = require("multer");
var auth = require("../middlewares/auth");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: process.env.MAX_IMAGE_SIZE
            ? parseInt(process.env.MAX_IMAGE_SIZE)
            : 500000,
    },
});
router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
module.exports = router;
