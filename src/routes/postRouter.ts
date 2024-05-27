const express = require("express");
const router = express.Router();

const createPost = require("../controllers/Posts/createPost");
const getPostById = require("../controllers/Posts/getPostById");
const getPostsByUserId = require("../controllers/Posts/getPostsByUserId");
const editById = require("../controllers/Posts/editPostById");
const deletePostById = require("../controllers/Posts/deletePostById");
const addPostLike = require("../controllers/Posts/addPostLike");

const multer = require("multer");
const auth = require("../middlewares/auth");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});

router.use(auth);

router.post("/add", upload.single("image"), createPost);
router.put("/editById", upload.single("image"), editById);
router.get("/getById", getPostById);
router.get("/getPostsByUserId", getPostsByUserId);
router.delete("/deleteById", deletePostById);
router.post("/addPostLike", addPostLike);

module.exports = router;
