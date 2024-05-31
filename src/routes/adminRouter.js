"use strict";
var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var idValidator = require("../middlewares/idValidator");
var models = require("../utils/models");
var createAdmin = require("../controllers/Admin/createAdmin");
var deleteAdmin = require("../controllers/Admin/deleteAdmin");
router.use(auth);
router.post("/add", createAdmin);
router.delete("/delete", idValidator([
    {
        fieldStr: "admin_id",
        fieldObj: models.Admin,
    },
], false, true), deleteAdmin);
module.exports = router;
