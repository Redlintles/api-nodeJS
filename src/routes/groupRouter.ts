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

const addMember = require("../controllers/Group/addMember");

router.use(auth);
router.post("/add", upload.single("banner"), createGroup);
router.get("/getUserGroups", getUserGroups);
router.get("/getAllGroups", getAllGroups);
router.put("/editGroup", upload.single("banner"), editGroup);
router.delete("/delete", deleteGroup);
router.post("/addMember", addMember);

module.exports = router;
