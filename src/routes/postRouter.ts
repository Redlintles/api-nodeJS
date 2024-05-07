const express = require("express");
const router = express.Router();

const createPost = require("../controllers/Posts/createPost");
const getPostById = require("../controllers/Posts/getPostById");
const getPostsByUserId = require("../controllers/Posts/getPostsByUserId");
const deletePostById = require("../controllers/Posts/deletePostById");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});

router.post("/add", upload.single("image"), createPost);
router.get("/getById", getPostById);
router.get("/getPostsByUserId", getPostsByUserId);
router.delete("/deleteById", deletePostById);

module.exports = router;
