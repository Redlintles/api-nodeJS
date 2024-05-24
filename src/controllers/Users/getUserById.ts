import { Request, Response } from "express";
const { User, Profile } = require("../../utils/models");

const validateId = require("../../utils/validateId");

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.query;

  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const object = await User.findByPk(userId);
  const profile = await Profile.findOne({ where: { id_user: userId } });

  if (!object || !profile) {
    return res.status(400).json({
      error: true,
      message: "User not found",
    });
  } else {
    return res.status(200).json({
      error: false,
      message: "SUCCESS",
      user: object,
      profile,
    });
  }
};

module.exports = getUserById;
