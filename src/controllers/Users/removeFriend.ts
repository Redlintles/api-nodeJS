import { Request, Response } from "express";

const { UserFriends } = require("../../utils/models");

const removeFriend = async (req: Request, res: Response) => {
  const { id_user, id_friend } = req.query;

  const alreadyExists = await UserFriends.findOne({
    where: {
      id_friend,
      id_user,
    },
  });

  if (!alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "relationship does not exists",
    });
  }

  try {
    await alreadyExists.destroy();

    return res.status(200).json({
      error: false,
      message: "friend removed successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = removeFriend;
