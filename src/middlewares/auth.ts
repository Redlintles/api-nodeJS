import { Request, Response, NextFunction } from "express";
const { Admin } = require("../utils/models");

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!apiKey) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }
  if (!regex.test(apiKey.toString())) {
    return res.status(401).json({
      error: true,
      message: "API Key is not valid",
    });
  }

  const allowedUser = await Admin.findOne({
    where: {
      "api-key": apiKey,
    },
  });

  if (allowedUser) {
    return next();
  } else {
    return res.status(401).json({
      error: true,
      message: "User not allowed",
    });
  }
};

module.exports = auth;
