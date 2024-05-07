"use strict";
var express = require("express");
var router = express.Router();
var createPost = require("../controllers/Posts/createPost");
var getPostById = require("../controllers/Posts/getPostById");
var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
});
router.post("/add", upload.single("image"), createPost);
router.get("/getById", getPostById);
module.exports = router;
