import { Request, Response } from "express";

const { UserFriends } = require("../../utils/models");

const addFriend = async (req: Request, res: Response) => {
  const { id_user, id_friend } = req.body;

  const alreadyExists = await UserFriends.findOne({
    where: {
      id_user: id_user,
      id_friend: id_friend,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "relationship already exists",
    });
  }

  const relationship = await UserFriends.create({
    id_friend: id_friend,
    id_user: id_user,
  });

  return res.status(200).json({
    error: false,
    message: "friend added successfully",
    obj: relationship,
  });
};

module.exports = addFriend;
