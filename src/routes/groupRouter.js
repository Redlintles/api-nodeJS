"use strict";
var express = require("express");
var router = express.Router();
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
var createGroup = require("../controllers/Group/createGroup");
var deleteGroup = require("../controllers/Group/deleteGroup");
router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
router.delete("/delete", deleteGroup);
module.exports = router;
