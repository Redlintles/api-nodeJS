import { Request, Response } from "express";

const { UserFollower } = require("../../utils/models");

const removeFollower = async (req: Request, res: Response) => {
  const { id_follower, id_followed } = req.query;

  const alreadyExists = await UserFollower.findOne({
    where: {
      id_followed,
      id_follower,
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
      message: "follower removed successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = removeFollower;
