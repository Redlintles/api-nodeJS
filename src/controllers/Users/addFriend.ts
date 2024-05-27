import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const { User, UserFriends } = require("../../utils/models");

const addFriend = async (req: Request, res: Response) => {
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

  const user = await User.findByPk(userId);
  const friend = await User.findByPk(friendId);

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "user doesn't exists",
    });
  }
  if (!friend) {
    return res.status(400).json({
      error: true,
      message: "friend user doesn't exists",
    });
  }

  const alreadyExists = await UserFriends.findOne({
    where: {
      id_user: userId,
      id_friend: friendId,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "relationship already exists",
    });
  }

  const relationship = await UserFriends.create({
    id_friend: friendId,
    id_user: userId,
  });

  return res.status(200).json({
    error: false,
    message: "friend added successfully",
    obj: relationship,
  });
};

module.exports = addFriend;
