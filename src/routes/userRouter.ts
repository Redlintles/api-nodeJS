const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");
const deleteById = require("../controllers/Users/deleteById");

router.post("/add", createUser);
router.get("/getById", getUserById);
router.delete("/deleteById", deleteById);

module.exports = router;
