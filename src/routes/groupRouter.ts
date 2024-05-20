const express = require("express");
const router = express.Router();
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

const createGroup = require("../controllers/Group/createGroup");
const deleteGroup = require("../controllers/Group/deleteGroup");

router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
router.delete("/delete", deleteGroup);

module.exports = router;
