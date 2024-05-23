const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});

const editProfile = require("../controllers/Profile/editProfile");

router.post("/edit", upload.single("image"), editProfile);

module.exports = router;
