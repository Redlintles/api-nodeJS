const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const createAdmin = require("../controllers/Admin/createAdmin");

router.use(auth);
router.post("/add", createAdmin);
module.exports = router;
