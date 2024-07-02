import { NextFunction, Request, Response } from "express";

const { UserTag } = require("../../utils/models");

const userRemoveTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_tag, id_user } = req.query;

  const targetRelationship = await UserTag.findOne({
    where: {
      id_tag,
      id_user,
    },
  });

  if (!targetRelationship) {
    return res.status(400).json({
      error: true,
      message: "The user doesn't have the specified tag anymore",
    });
  }

  try {
    await targetRelationship.destroy();
    return res.status(200).json({
      error: false,
      message: "Tag removed successfully",
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = userRemoveTag;
