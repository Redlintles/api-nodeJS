const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const createAdmin = require("../controllers/Admin/createAdmin");
const deleteAdmin = require("../controllers/Admin/deleteAdmin");

router.use(auth);
router.post("/add", createAdmin);
router.delete("/delete", deleteAdmin);
module.exports = router;
