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
var addMember = require("../controllers/Group/addMember");
var deleteMember = require("../controllers/Group/deleteMember");
router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
router.get("/getUserGroups", getUserGroups);
router.get("/getAllGroups", getAllGroups);
router.get("/getGroupById", getGroupById);
router.put("/editGroup", upload.single("banner"), editGroup);
router.delete("/delete", deleteGroup);
router.post("/addMember", addMember);
router.delete("/deleteMember", deleteMember);
module.exports = router;
