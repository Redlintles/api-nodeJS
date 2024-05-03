const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");

router.post("/add", createUser);
router.get("/getUserById", getUserById);

module.exports = router;
