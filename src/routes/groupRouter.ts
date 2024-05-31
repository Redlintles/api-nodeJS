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
const getUserGroups = require("../controllers/Group/getUserGroups");
const getAllGroups = require("../controllers/Group/getAllGroups");
const editGroup = require("../controllers/Group/editGroup");
const getGroupById = require("../controllers/Group/getGroupById");
const getGroupsWithUser = require("../controllers/Group/getGroupsWithUser");

const addMember = require("../controllers/Group/addMember");
const deleteMember = require("../controllers/Group/deleteMember");

const models = require("../utils/models");
const idValidator = require("../middlewares/idValidator");

router.use(auth);

router.get("/getAllGroups", getAllGroups);

router.post(
  "/add",
  idValidator(
    [
      {
        fieldStr: "admin_id",
        fieldObj: models.User,
      },
    ],
    false,
    true
  ),
  upload.single("banner"),
  createGroup
);
router.get(
  "/getUserGroups",
  idValidator([
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
  ]),
  getUserGroups
);

router.get(
  "/getGroupById",
  idValidator([
    {
      fieldStr: "id_group",
      fieldObj: models.Group,
    },
  ]),
  getGroupById
);
router.get(
  "/getGroupsWithUser",
  idValidator([
    {
      fieldStr: "id_user",
      fieldObj: models.User,
    },
  ]),
  getGroupsWithUser
);
router.put(
  "/editGroup",
  idValidator([
    {
      fieldStr: "group_id",
      fieldObj: models.Group,
    },
    {
      fieldStr: "admin_id",
      fieldObj: models.User,
    },
  ]),
  upload.single("banner"),
  editGroup
);
router.delete(
  "/delete",
  idValidator([
    {
      fieldStr: "admin_id",
      fieldObj: models.User,
    },
  ]),
  deleteGroup
);

router.post(
  "/addMember",
  idValidator(
    [
      {
        fieldStr: "id_member",
        fieldObj: models.User,
      },
      {
        fieldStr: "id_group",
        fieldObj: models.Group,
      },
    ],
    false,
    true
  ),
  addMember
);
router.delete(
  "/deleteMember",
  idValidator([
    {
      fieldStr: "id_member",
      fieldObj: models.User,
    },
    {
      fieldStr: "id_group",
      fieldObj: models.Group,
    },
  ]),
  deleteMember
);

module.exports = router;
