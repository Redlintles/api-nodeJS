import { NextFunction, Request, Response } from "express";
const { Admin } = require("../../utils/models");

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  const { admin_id: adminId } = req.query;

  const root = await Admin.findOne({
    where: {
      "api-key": apiKey,
    },
  });

  if (!root || root.username !== "root") {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }

  if (parseInt(adminId as string) === 1) {
    return res.status(400).json({
      error: true,
      message: "Cannot delete root",
    });
  }

  const admin = await Admin.findByPk(adminId);

  if (!admin) {
    return res.status(400).json({
      error: true,
      message: "User does not exists",
    });
  }

  try {
    await admin.destroy();

    return res.status(200).json({
      error: false,
      message: "Admin deleted successfully",
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = deleteAdmin;
