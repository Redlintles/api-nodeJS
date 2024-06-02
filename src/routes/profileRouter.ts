{
  const express = require("express");
  const router = express.Router();
  const multer = require("multer");

  const idValidator = require("../middlewares/idValidator");
  const models = require("../utils/models");
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500000 },
  });
  const auth = require("../middlewares/auth");

  const editProfile = require("../controllers/Profile/editProfile");

  router.use(auth);
  router.put(
    "/edit",
    idValidator([
      {
        fieldStr: "id_user",
        fieldObj: models.User,
      },
    ]),
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "profilePhoto", maxCount: 1 },
    ]),
    editProfile
  );

  module.exports = router;
}
