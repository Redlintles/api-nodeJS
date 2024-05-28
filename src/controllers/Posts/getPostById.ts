import { Request, Response } from "express";

const {
  Post,
  PostLikes,
  Comment,
  sequelizeConn,
} = require("../../utils/models");

const getPostById = async (req: Request, res: Response) => {
  const { id_post } = req.query;

  const post = await Post.findByPk(id_post);

  const transaction = await sequelizeConn.transaction();
  try {
    const comments = await Comment.findAll({
      where: {
        id_post: id_post,
      },
    });

    const likes = await PostLikes.findAll({
      where: {
        id_post: id_post,
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
