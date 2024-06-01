import { NextFunction, Request, Response } from "express";

const { UserFriends } = require("../../utils/models");

const removeFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = removeFriend;
