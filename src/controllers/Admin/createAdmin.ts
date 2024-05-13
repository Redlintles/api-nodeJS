import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const { userValidations } = require("../../utils/stringUtils");
const { Admin } = require("../../utils/models");

const createAdmin = async (req: Request, res: Response) => {
  const apiKey = uuidv4();
  const { username, password } = req.body;
  const { validateUsername, validatePassword } = userValidations;

  const isNotDefined = [username, password].includes(undefined);
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
  if (!validateUsername(password)) {
    return res.status(400).json({
      error: true,
      message: "Password is too weak",
    });
  }

  const admin = await Admin.create({
    username,
    password,
    "api-key": apiKey,
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
