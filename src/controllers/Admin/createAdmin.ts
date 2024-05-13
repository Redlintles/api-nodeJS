import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const { userValidation } = require("../../utils/stringUtils");
const { Admin } = require("../../utils/models");

const createAdmin = async (req: Request, res: Response) => {
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

  const admin = await Admin.create({
    username,
    password,
    "api-key": newApiKey,
  });

  if (admin) {
    return res.status(200).json({
      error: false,
      message: "Admin Created Successfully",
      admin,
    });
  } else {
    return res.status(500).json({
      error: true,
      message: "An Unexpected error ocurred, please try later",
    });
  }
};

module.exports = createAdmin;
