import { NextFunction, Request, Response } from "express";
const { Comment } = require("../../utils/models");

const deleteCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id_comment: commentId } = req.query;

  const register = await Comment.findByPk(commentId);

  if (!register.belongs_to) {
    await Comment.destroy({
      where: {
        belongs_to: register.id,
      },
    });
  }
  try {
    await register.destroy();

    return res.status(200).json({
      error: false,
      message: "Comment and it's replies removed successfully",
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = deleteCommentById;
