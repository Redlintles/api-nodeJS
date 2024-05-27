const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");
const deleteById = require("../controllers/Users/deleteById");
const editById = require("../controllers/Users/editById");

const addFollower = require("../controllers/Users/addFollower");
const removeFollower = require("../controllers/Users/removeFollower");
const addFriend = require("../controllers/Users/addFriend");
const removeFriend = require("../controllers/Users/removeFriend");
const userAddTag = require("../controllers/Users/userAddTag");
const userRemoveTag = require("../controllers/Users/userRemoveTag");
const auth = require("../middlewares/auth");

router.use(auth);
router.post("/add", createUser);
router.get("/getById", getUserById);
router.delete("/deleteById", deleteById);
router.put("/editById", editById);
router.post("/addFollower", addFollower);
router.delete("/removeFollower", removeFollower);
router.post("/addFriend", addFriend);
router.delete("/removeFriend", removeFriend);
router.post("/userAddTag", userAddTag);
router.delete("/userRemoveTag", userRemoveTag);

module.exports = router;
