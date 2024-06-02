"use strict";
{
    var express = require("express");
    var router = express.Router();
    var createUser = require("../controllers/Users/createUser");
    var getUserById = require("../controllers/Users/getUserById");
    var deleteById = require("../controllers/Users/deleteById");
    var editById = require("../controllers/Users/editById");
    var addFollower = require("../controllers/Users/addFollower");
    var removeFollower = require("../controllers/Users/removeFollower");
    var addFriend = require("../controllers/Users/addFriend");
    var removeFriend = require("../controllers/Users/removeFriend");
    var userAddTag = require("../controllers/Users/userAddTag");
    var userRemoveTag = require("../controllers/Users/userRemoveTag");
    var auth = require("../middlewares/auth");
    var models = require("../utils/models");
    var idValidator = require("../middlewares/idValidator");
    router.use(auth);
    router.post("/add", createUser);
    router.get("/getById", idValidator([
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
    ], false, true), getUserById);
    router.delete("/deleteById", idValidator([
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
    ], false, true), deleteById);
    router.put("/editById", idValidator([
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
    ], false, true), editById);
    router.post("/addFollower", idValidator([
        {
            fieldStr: "id_follower",
            fieldObj: models.User,
        },
        {
            fieldStr: "id_followed",
            fieldObj: models.User,
        },
    ], true, true), addFollower);
    router.delete("/removeFollower", idValidator([
        {
            fieldStr: "id_follower",
            fieldObj: models.User,
        },
        {
            fieldStr: "id_followed",
            fieldObj: models.User,
        },
    ], true, true), removeFollower);
    router.post("/addFriend", idValidator([
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
        {
            fieldStr: "id_friend",
            fieldObj: models.User,
        },
    ], true, true), addFriend);
    router.delete("/removeFriend", idValidator([
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
        {
            fieldStr: "id_friend",
            fieldObj: models.User,
        },
    ], true, true), removeFriend);
    router.post("/userAddTag", idValidator([
        {
            fieldStr: "id_tag",
            fieldObj: models.Tag,
        },
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
    ], false, true), userAddTag);
    router.delete("/userRemoveTag", idValidator([
        {
            fieldStr: "id_tag",
            fieldObj: models.Tag,
        },
        {
            fieldStr: "id_user",
            fieldObj: models.User,
        },
    ], false, true), userRemoveTag);
    module.exports = router;
}
