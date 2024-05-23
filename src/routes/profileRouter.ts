const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});
const auth = require("../middlewares/auth");

const editProfile = require("../controllers/Profile/editProfile");

router.use(auth);
router.post(
  "/edit",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  editProfile
);

module.exports = router;
