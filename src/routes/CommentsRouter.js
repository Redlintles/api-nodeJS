"use strict";
var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var idValidator = require("../middlewares/idValidator");
var models = require("../utils/models");
var createComment = require("../controllers/Comments/createComment");
var deleteCommentById = require("../controllers/Comments/deleteCommentById");
var getCommentById = require("../controllers/Comments/getCommentById");
var editComment = require("../controllers/Comments/editComment");
router.use(auth);
router.post("/add", idValidator([
    {
        fieldStr: "id_author",
        fieldObj: models.User,
    },
    {
        fieldStr: "id_post",
        fieldObj: models.Post,
    },
], false, true), createComment);
router.delete("/deleteById", idValidator([
    {
        fieldStr: "id_comment",
        fieldObj: models.Comment,
    },
], false, true), deleteCommentById);
router.get("/getById", idValidator([
    {
        fieldStr: "id",
        fieldObj: models.Comment,
    },
], false, true), getCommentById);
router.put("/editById", idValidator([
    {
        fieldStr: "id",
        fieldObj: models.Comment,
    },
], false, true), editComment);
module.exports = router;
