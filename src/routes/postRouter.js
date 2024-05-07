"use strict";
var express = require("express");
var router = express.Router();
var createPost = require("../controllers/Posts/createPost");
var getPostById = require("../controllers/Posts/getPostById");
var getPostsByUserId = require("../controllers/Posts/getPostsByUserId");
var editById = require("../controllers/Posts/editPostById");
var deletePostById = require("../controllers/Posts/deletePostById");
var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
});
router.post("/add", upload.single("image"), createPost);
router.put("/editById", upload.single("image"), editById);
router.get("/getById", getPostById);
router.get("/getPostsByUserId", getPostsByUserId);
router.delete("/deleteById", deletePostById);
module.exports = router;
