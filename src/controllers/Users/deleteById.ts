import { Request, Response } from "express";
const User = require("../../models/user.js");

const validateId = require("../../utils/validateId");

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.query;

  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const object = await User.findByPk(userId);
  if (object) {
    await object.destroy();

    return res.status(200).json({
      error: false,
      message: "User deleted succesfully",
      user: object,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "User Not Found",
    });
  }
};

module.exports = deleteById;
