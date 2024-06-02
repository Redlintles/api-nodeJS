import { NextFunction, Request, Response } from "express";
const { Post, sequelizeConn } = require("../../utils/models");

const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_post } = req.query;

  const post = await Post.findByPk(id_post);

  const transaction = await sequelizeConn.transaction();

  try {
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
