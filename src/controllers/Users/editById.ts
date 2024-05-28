import { Request, Response } from "express";
const { User } = require("../../utils/models");
const validateEditObj = require("../../utils/validateEditObj");

const editById = async (req: Request, res: Response) => {
  const { id } = req.query;

  const object = await User.findByPk(id);

  const old = {
    username: object.username,
    email: object.email,
    password: object.password,
    phone_number: object.phone_number,
  };

  const result = validateEditObj(old, req.body);

  if (typeof result == "string") {
    return res.status(400).json({
      error: true,
      message: result,
    });
  } else {
    await User.update(result, {
      where: { id },
    });

    const after = await User.findByPk(id);

    return res.status(200).json({
      error: false,
      message: "User Updated Successfully",
      old: object,
      after,
    });
  }
};

module.exports = editById;
