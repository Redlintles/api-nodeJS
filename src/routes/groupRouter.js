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
var addMember = require("../controllers/Group/addMember");
router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
router.get("/getUserGroups", getUserGroups);
router.get("/getAllGroups", getAllGroups);
router.put("/editGroup", upload.single("banner"), editGroup);
router.delete("/delete", deleteGroup);
router.post("/addMember", addMember);
module.exports = router;
