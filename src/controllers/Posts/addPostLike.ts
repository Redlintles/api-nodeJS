import { Request, Response } from "express";

const { PostLikes } = require("../../utils/models");

const addPostLike = async (req: Request, res: Response) => {
  const { id_post, id_user } = req.query;

  const hasAlreadyLiked = await PostLikes.findOne({
    where: {
      id_post,
      id_user,
    },
  });

  if (hasAlreadyLiked) {
    return res.status(400).json({
      error: true,
      message: "The specified user has already liked this post",
    });
  }

  const like = await PostLikes.create({
    id_post,
    id_user,
  });

  return res.status(200).json({
    error: false,
    message: "Like Added successfully",
    obj: like,
  });
};

module.exports = addPostLike;
