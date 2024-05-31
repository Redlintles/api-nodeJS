"use strict";
var express = require("express");
var router = express.Router();
var createTag = require("../controllers/Tags/createTag");
var deleteTag = require("../controllers/Tags/deleteTag");
var auth = require("../middlewares/auth");
var idValidator = require("../middlewares/idValidator");
var models = require("../utils/models");
router.use(auth);
router.post("/add", createTag);
router.delete("/delete", idValidator([
    {
        fieldStr: "id_tag",
        fieldObj: models.Tag,
        optional: true,
    },
], false, true), deleteTag);
module.exports = router;
