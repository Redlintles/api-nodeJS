"use strict";
var express = require("express");
var router = express.Router();
var createPost = require("../controllers/Posts/createPost");
var getPostById = require("../controllers/Posts/getPostById");
var getPostsByUserId = require("../controllers/Posts/getPostsByUserId");
var editById = require("../controllers/Posts/editPostById");
var deletePostById = require("../controllers/Posts/deletePostById");
var addPostLike = require("../controllers/Posts/addPostLike");
var removePostLike = require("../controllers/Posts/removePostLike");
var idValidator = require("../middlewares/idValidator");
var models = require("../utils/models");
var multer = require("multer");
var auth = require("../middlewares/auth");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
});
router.use(auth);
router.post("/add", idValidator([
    {
        fieldStr: "id_author",
        fieldObj: models.User,
    },
], false, true), upload.single("image"), createPost);
router.put("/editById", idValidator([
    {
        fieldStr: "id",
        fieldObj: models.Post,
    },
], false, true), upload.single("image"), editById);
router.get("/getById", idValidator([
    {
        fieldStr: "id_post",
        fieldObj: models.Post,
    },
]), getPostById);
router.get("/getPostsByUserId", idValidator([
    {
        fieldStr: "id",
        fieldObj: models.User,
    },
]), getPostsByUserId);
router.delete("/deleteById", idValidator([
    {
        fieldStr: "id_post",
        fieldObj: models.Post,
    },
], false, true), deletePostById);
router.post("/addPostLike", idValidator([
    {
        fieldStr: "id_post",
        fieldObj: models.Post,
    },
    {
        fieldStr: "id_user",
        fieldObj: models.User,
    },
], false, true), addPostLike);
router.delete("/removePostLike", idValidator([
    {
        fieldStr: "id_post",
        fieldObj: models.Post,
    },
    {
        fieldStr: "id_user",
        fieldObj: models.User,
    },
]), removePostLike);
module.exports = router;
