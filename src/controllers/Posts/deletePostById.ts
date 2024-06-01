import { NextFunction, Request, Response } from "express";
const {
  Post,
  PostLikes,
  sequelizeConn,
  Comment,
} = require("../../utils/models");

const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_post } = req.query;

  const post = await Post.findByPk(id_post);

  const transaction = await sequelizeConn.transaction();

  try {
    await Comment.destroy({
      where: {
        id_post,
      },
    });

    await PostLikes.destroy({
      where: {
        id_post,
      },
    });
    await Post.destroy({
      where: {
        id: id_post,
      },
    });

    await transaction.commit();
    return res.status(200).json({
      error: false,
      message: "Post deleted successfully",
      post,
    });
  } catch (err: any) {
    await transaction.rollback();
    req.body.error = err;
    next();
  }
};

module.exports = deletePostById;
