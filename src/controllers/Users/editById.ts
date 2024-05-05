import { Request, Response } from "express";
const User = require("../../models/user");
const { userValidation } = require("../../utils/stringUtils");
const validateEditObj = require("../../utils/validateEditObj");

const editById = async (req: Request, res: Response) => {
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
        where: { id: userId },
      });

      const after = await User.findByPk(userId);

      return res.status(200).json({
        error: false,
        message: "User Updated Successfully",
        old: object,
        after,
      });
    }
  }
};

module.exports = editById;
