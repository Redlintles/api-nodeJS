const express = require("express");
const router = express.Router();

const createPost = require("../controllers/Posts/createPost");
const getPostById = require("../controllers/Posts/getPostById");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});

router.post("/add", upload.single("image"), createPost);
router.get("/getById", getPostById);

module.exports = router;
