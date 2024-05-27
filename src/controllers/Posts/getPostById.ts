import { Request, Response } from "express";

const {
  Post,
  PostLikes,
  Comment,
  sequelizeConn,
} = require("../../utils/models");

const validateId = require("../../utils/validateId");

const getPostById = async (req: Request, res: Response) => {
  const { id_post } = req.query;

  let postId = validateId(id_post);

  if (typeof postId === "string") {
    return res.status(400).json({
      error: true,
      message: postId,
    });
  }

  const post = await Post.findByPk(postId);

  if (!post) {
    return res.status(400).json({
      error: true,
      message: "Post not found",
    });
  }

  const transaction = await sequelizeConn.transaction();
  try {
    const comments = await Comment.findAll({
      where: {
        id_post: postId,
      },
    });

    const likes = await PostLikes.findAll({
      where: {
        id_post: postId,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Post found successfully",
      obj: post,
      comments,
      likes: likes.length,
    });
  } catch {}
};

module.exports = getPostById;
