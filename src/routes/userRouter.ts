const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");
const deleteById = require("../controllers/Users/deleteById");
const editById = require("../controllers/Users/editById");

router.post("/add", createUser);
router.get("/getById", getUserById);
router.delete("/deleteById", deleteById);
router.put("/editById", editById);

module.exports = router;
