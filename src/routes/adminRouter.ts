const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const idValidator = require("../middlewares/idValidator");
const models = require("../utils/models");

const createAdmin = require("../controllers/Admin/createAdmin");
const deleteAdmin = require("../controllers/Admin/deleteAdmin");

router.use(auth);
router.post("/add", createAdmin);
router.delete(
  "/delete",
  idValidator(
    [
      {
        fieldStr: "admin_id",
        fieldObj: models.Admin,
      },
    ],
    false,
    true
  ),
  deleteAdmin
);
module.exports = router;
