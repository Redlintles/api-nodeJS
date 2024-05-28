import { Request, Response } from "express";

const {
  Post,
  PostLikes,
  Comment,
  User,
  sequelizeConn,
} = require("../../utils/models");

const getPostById = async (req: Request, res: Response) => {
  const { id_post } = req.query;

  const post = await Post.findByPk(id_post);

  const transaction = await sequelizeConn.transaction();
  try {
    const author = await User.findByPk(post.id_author);
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

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "Post found successfully",
      obj: post,
      author,
      comments,
      likes: likes.length,
    });
  } catch {
    await transaction.rollback();
    return res.status(500).json({
      error: true,
      message: "Um erro inesperado aconteceu, tente novamente mais tarde",
    });
  }
};

module.exports = getPostById;
