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
var getUserGroups = require("../controllers/Group/getUserGroups");
var getAllGroups = require("../controllers/Group/getAllGroups");
var editGroup = require("../controllers/Group/editGroup");
var getGroupById = require("../controllers/Group/getGroupById");
var getGroupsWithUser = require("../controllers/Group/getGroupsWithUser");
var addMember = require("../controllers/Group/addMember");
var deleteMember = require("../controllers/Group/deleteMember");
var models = require("../utils/models");
var idValidator = require("../middlewares/idValidator");
router.use(auth);
router.get("/getAllGroups", getAllGroups);
router.post("/add", idValidator([
    {
        fieldStr: "admin_id",
        fieldObj: models.User,
    },
], false, true), upload.single("banner"), createGroup);
router.get("/getUserGroups", idValidator([
    {
        fieldStr: "id_user",
        fieldObj: models.User,
    },
], false, true), getUserGroups);
router.get("/getGroupById", idValidator([
    {
        fieldStr: "id_group",
        fieldObj: models.Group,
    },
], false, true), getGroupById);
router.get("/getGroupsWithUser", idValidator([
    {
        fieldStr: "id_user",
        fieldObj: models.User,
    },
], false, true), getGroupsWithUser);
router.put("/editGroup", idValidator([
    {
        fieldStr: "group_id",
        fieldObj: models.Group,
    },
    {
        fieldStr: "admin_id",
        fieldObj: models.User,
    },
], false, true), upload.single("banner"), editGroup);
router.delete("/delete", idValidator([
    {
        fieldStr: "admin_id",
        fieldObj: models.User,
    },
], false, true), deleteGroup);
router.post("/addMember", idValidator([
    {
        fieldStr: "id_member",
        fieldObj: models.User,
    },
    {
        fieldStr: "id_group",
        fieldObj: models.Group,
    },
], false, true), addMember);
router.delete("/deleteMember", idValidator([
    {
        fieldStr: "id_member",
        fieldObj: models.User,
    },
    {
        fieldStr: "id_group",
        fieldObj: models.Group,
    },
], false, true), deleteMember);
module.exports = router;
