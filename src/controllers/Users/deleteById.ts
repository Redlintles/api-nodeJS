import { Request, Response } from "express";
const User = require("../../models/user.js");

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id is not defined",
    });
  }

  if (!/^\d+$/.test(id.toString())) {
    return res.status(400).json({
      error: true,
      message: "Id must be a number",
    });
  }
  let userId = parseInt(id.toString());

  const object = await User.findByPk(userId);
  if (object) {
    const obj = {
      username: object.username,
      email: object.email,
      password: object.password,
      phone_number: object.phone_number,
    };

    await object.destroy();

    return res.status(200).json({
      error: false,
      message: "User deleted succesfully",
      user: obj,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "User Not Found",
    });
  }
};

module.exports = deleteById;
