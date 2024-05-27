import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { User, UserFriends } = require("../../utils/models");

const removeFriend = async (req: Request, res: Response) => {
  const { id_user, id_friend } = req.body;

  const userId = validateId(id_user);
  const friendId = validateId(id_friend);

  if (typeof friendId === "string") {
    return res.status(400).json({
      error: true,
      message: friendId,
    });
  }
  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const friend = await User.findByPk(friendId);
  const user = await User.findByPk(userId);

  if (!friend) {
    return res.status(400).json({
      error: true,
      message: "Friend user doesn't exists",
    });
  }
  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User doesn't exists",
    });
  }

  const alreadyExists = await UserFriends.findOne({
    where: {
      id_friend: friendId,
      id_user: userId,
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
