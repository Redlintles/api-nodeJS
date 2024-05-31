const express = require("express");
const router = express.Router();

const createPost = require("../controllers/Posts/createPost");
const getPostById = require("../controllers/Posts/getPostById");
const getPostsByUserId = require("../controllers/Posts/getPostsByUserId");
const editById = require("../controllers/Posts/editPostById");
const deletePostById = require("../controllers/Posts/deletePostById");
const addPostLike = require("../controllers/Posts/addPostLike");
const removePostLike = require("../controllers/Posts/removePostLike");

const idValidator = require("../middlewares/idValidator");
const models = require("../utils/models");

const multer = require("multer");
const auth = require("../middlewares/auth");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500000 },
});

router.use(auth);

router.post(
  "/add",
  idValidator(
    [
      {
        fieldStr: "id_author",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  upload.single("image"),
  createPost
);
router.put(
  "/editById",
  idValidator(
    [
      {
        fieldStr: "id",
        fieldObj: models.Post,
      },
    ],
    false,
    true
  ),
  upload.single("image"),
  editById
);
router.get(
  "/getById",
  idValidator([
    {
      fieldStr: "id_post",
      fieldObj: models.Post,
    },
  ]),
  getPostById
);
router.get(
  "/getPostsByUserId",
  idValidator([
    {
      fieldStr: "id",
      fieldObj: models.User,
    },
  ]),
  getPostsByUserId
);
router.delete(
  "/deleteById",
  idValidator(
    [
      {
        fieldStr: "id",
        fieldObj: models.Post,
      },
    ],
    false,
    true
  ),
  deletePostById
);
router.post(
  "/addPostLike",
  idValidator(
    [
      {
        fieldStr: "id_post",
        fieldObj: models.Post,
      },
      {
        fieldStr: "id_user",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  addPostLike
);
router.delete(
  "/removePostLike",
  idValidator([
    {
      fieldStr: "id_post",
      fieldObj: models.Post,
    },
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
  ]),
  removePostLike
);

module.exports = router;
