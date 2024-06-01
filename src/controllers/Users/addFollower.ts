import { NextFunction, Request, Response } from "express";

const { UserFollower } = require("../../utils/models");

const addFollower = async (req: Request, res: Response, next: NextFunction) => {
  const { id_follower, id_followed } = req.query;

  const alreadyExists = await UserFollower.findOne({
    where: {
      id_followed,
      id_follower,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "relationship already exists",
    });
  }

  try {
    const relationship = await UserFollower.create({
      id_followed,
      id_follower,
    });

    return res.status(200).json({
      error: false,
      message: "follower added successfully",
      obj: relationship,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = addFollower;
