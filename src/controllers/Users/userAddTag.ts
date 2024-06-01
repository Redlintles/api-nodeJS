import { Request, Response } from "express";

const { UserTag } = require("../../utils/models");

const userAddTag = async (req: Request, res: Response) => {
  const { id_tag, id_user } = req.query;

  const alreadyExists = await UserTag.findOne({
    where: {
      id_user,
      id_tag,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "The user already have this tag",
    });
  }

  try {
    await UserTag.create({
      id_tag,
      id_user,
    });

    return res.status(200).json({
      error: false,
      message: "Tag added successfully",
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "AN unexpected error ocurred, try again later",
    });
  }
};

module.exports = userAddTag;
