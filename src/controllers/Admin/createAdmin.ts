import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const { userValidation } = require("../../utils/stringUtils");
const { Admin } = require("../../utils/models");

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  const newApiKey = uuidv4();
  const { username, password } = req.body;
  const { validateUsername, validatePassword } = userValidation;

  const isNotDefined = [username, password].includes(undefined);

  const root = await Admin.findOne({ where: { "api-key": apiKey } });

  if (root && root.username !== "root") {
    return res.status(401).json({
      error: true,
      message: "Only root can create admins",
    });
  }

  if (isNotDefined) {
    return res.status(400).json({
      error: true,
      message: "Username or password not defined",
    });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({
      error: true,
      message: "Username not valid",
    });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: true,
      message: "Password is too weak",
    });
  }

  const adm = await Admin.findOne({
    where: {
      username: username,
    },
  });

  if (adm) {
    return res.status(400).json({
      error: true,
      message: "User already Exists",
    });
  }

  try {
    const admin = await Admin.create({
      username,
      password,
      "api-key": newApiKey,
    });

    return res.status(200).json({
      error: false,
      message: "Admin Created Successfully",
      admin,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = createAdmin;
