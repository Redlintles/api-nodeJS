import { Request, Response } from "express";
const { Comment } = require("../../utils/models");

const { sequelizeErrorLogger } = require("../../utils/logger");

const deleteCommentById = async (req: Request, res: Response) => {
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
    sequelizeErrorLogger.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = deleteCommentById;
