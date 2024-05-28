const express = require("express");
const router = express.Router();

const createTag = require("../controllers/Tags/createTag");
const deleteTag = require("../controllers/Tags/deleteTag");
const auth = require("../middlewares/auth");

const idValidator = require("../middlewares/idValidator");
const models = require("../utils/models");

router.use(auth);
router.post("/add", createTag);
router.delete(
  "/delete",
  idValidator([
    {
      fieldStr: "id_tag",
      fieldObj: models.Tag,
    },
  ]),
  deleteTag
);

module.exports = router;
