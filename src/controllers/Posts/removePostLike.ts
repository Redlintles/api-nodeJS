import { Request, Response } from "express";

const { PostLikes } = require("../../utils/models");

const removePostLike = async (req: Request, res: Response) => {
  const { id_user, id_post } = req.query;

  const likeExists = await PostLikes.findOne({
    where: {
      id_post,
      id_user,
    },
  });

  if (!likeExists) {
    return res.status(400).json({
      error: true,
      message: "The specified user hasn't liked this post",
    });
  }

  try {
    await likeExists.destroy();

    return res.status(200).json({
      error: false,
      message: "Like removed successfully",
      obj: likeExists,
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = removePostLike;
