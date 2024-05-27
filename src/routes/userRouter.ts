const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");
const deleteById = require("../controllers/Users/deleteById");
const editById = require("../controllers/Users/editById");

const addFollower = require("../controllers/Users/addFollower");
const removeFollower = require("../controllers/Users/removeFollower");

const auth = require("../middlewares/auth");

router.use(auth);
router.post("/add", createUser);
router.get("/getById", getUserById);
router.delete("/deleteById", deleteById);
router.put("/editById", editById);
router.post("/addFollower", addFollower);
router.delete("/removeFollower", removeFollower);

module.exports = router;
