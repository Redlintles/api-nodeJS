const express = require("express");
const router = express.Router();
const createUser = require("../controllers/Users/createUser");
const getUserById = require("../controllers/Users/getUserById");
const deleteById = require("../controllers/Users/deleteById");
const editById = require("../controllers/Users/editById");

const addFollower = require("../controllers/Users/addFollower");
const removeFollower = require("../controllers/Users/removeFollower");
const addFriend = require("../controllers/Users/addFriend");
const removeFriend = require("../controllers/Users/removeFriend");
const userAddTag = require("../controllers/Users/userAddTag");
const userRemoveTag = require("../controllers/Users/userRemoveTag");
const auth = require("../middlewares/auth");

const models = require("../utils/models");
const idValidator = require("../middlewares/idValidator");

router.use(auth);
router.post("/add", createUser);
router.get(
  "/getById",
  idValidator(
    [
      {
        fieldStr: "id",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  getUserById
);
router.delete(
  "/deleteById",
  idValidator(
    [
      {
        fieldStr: "id",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  deleteById
);
router.put(
  "/editById",
  idValidator(
    [
      {
        fieldStr: "id",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  editById
);
router.post(
  "/addFollower",
  idValidator(
    [
      {
        fieldStr: "id_follower",
        fieldObj: models.User,
      },
      {
        fieldStr: "id_followed",
        fieldObj: models.User,
      },
    ],
    true,
    true
  ),
  addFollower
);
router.delete(
  "/removeFollower",
  idValidator(
    [
      {
        fieldStr: "id_follower",
        fieldObj: models.User,
      },
      {
        fieldStr: "id_followed",
        fieldObj: models.User,
      },
    ],
    true
  ),
  removeFollower
);
router.post(
  "/addFriend",
  idValidator(
    [
      {
        fieldStr: "id_user",
        fieldObj: models.User,
      },
      {
        fieldStr: "id_friend",
        fieldObj: models.User,
      },
    ],
    true,
    true
  ),
  addFriend
);
router.delete(
  "/removeFriend",
  idValidator([
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
    {
      fieldStr: "id_friend",
      fieldObj: models.User,
    },
  ]),
  removeFriend
);
router.post(
  "/userAddTag",
  idValidator([
    {
      fieldStr: "id_tag",
      fieldObj: models.Tag,
    },
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
  ]),
  userAddTag
);
router.delete(
  "/userRemoveTag",
  idValidator([
    {
      fieldStr: "id_tag",
      fieldObj: models.Tag,
    },
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
  ]),
  userRemoveTag
);

module.exports = router;
