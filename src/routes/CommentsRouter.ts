const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const idValidator = require("../middlewares/idValidator");
const models = require("../utils/models");

const createComment = require("../controllers/Comments/createComment");
const deleteCommentById = require("../controllers/Comments/deleteCommentById");
const getCommentById = require("../controllers/Comments/getCommentById");
const editComment = require("../controllers/Comments/editComment");

router.use(auth);
router.post(
  "/add",
  idValidator([
    {
      fieldStr: "id_author",
      tableField: "id",
      fieldObj: models.User,
    },
    {
      fieldStr: "id_post",
      tableField: "id",
      fieldObj: models.Post,
    },
  ]),
  createComment
);
router.delete(
  "/deleteById",
  idValidator(
    [
      {
        fieldStr: "id",
        tableField: "id",
        fieldObj: models.Comment,
      },
    ],
    false,
    true
  ),
  deleteCommentById
);
router.get(
  "/getById",
  idValidator(
    [
      {
        fieldStr: "id",
        tableField: "id",
        fieldObj: models.Comment,
      },
    ],
    false,
    true
  ),
  getCommentById
);
router.put(
  "/editById",
  idValidator(
    [
      {
        fieldStr: "id",
        tableField: "id",
        fieldObj: models.Comment,
      },
    ],
    false,
    true
  ),
  editComment
);
module.exports = router;
