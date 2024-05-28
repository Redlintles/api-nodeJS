import { Request, Response } from "express";

const { UserFriends } = require("../../utils/models");

const removeFriend = async (req: Request, res: Response) => {
  const { id_user, id_friend } = req.body;

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

  await alreadyExists.destroy();

  return res.status(200).json({
    error: false,
    message: "friend removed successfully",
  });
};

module.exports = removeFriend;
