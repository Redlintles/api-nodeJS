const express = require("express");
const router = express.Router();
const createGroup = require("../controllers/Group/createGroup");
const multer = require("multer");
const auth = require("../middlewares/auth");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: process.env.MAX_IMAGE_SIZE
      ? parseInt(process.env.MAX_IMAGE_SIZE)
      : 500000,
  },
});

router.use(auth);
router.post("/add", upload.single("banner"), createGroup);

module.exports = router;
