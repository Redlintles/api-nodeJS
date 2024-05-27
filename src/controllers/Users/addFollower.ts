import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const { User, UserFollower } = require("../../utils/models");

const addFollower = async (req: Request, res: Response) => {
  const { id_follower, id_followed } = req.body;

  const followerId = validateId(id_follower);
  const followedId = validateId(id_followed);

  if (typeof followedId === "string") {
    return res.status(400).json({
      error: true,
      message: followedId,
    });
  }
  if (typeof followerId === "string") {
    return res.status(400).json({
      error: true,
      message: followerId,
    });
  }

  const followed = await User.findByPk(followedId);
  const follower = await User.findByPk(followerId);

  if (!followed) {
    return res.status(400).json({
      error: true,
      message: "Followed user doesn't exists",
    });
  }
  if (!follower) {
    return res.status(400).json({
      error: true,
      message: "Follower user doesn't exists",
    });
  }

  const alreadyExists = await UserFollower.findOne({
    where: {
      id_followed: followedId,
      id_follower: followerId,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "relationship already exists",
    });
  }

  const relationship = await UserFollower.create({
    id_followed: followedId,
    id_follower: followerId,
  });

  return res.status(200).json({
    error: false,
    message: "follower added successfully",
    obj: relationship,
  });
};

module.exports = addFollower;
