import { Request, Response } from "express";

const { Comment } = require("../../utils/models");
const { sequelizeErrorLogger } = require("../../utils/logger");

const getCommentById = async (req: Request, res: Response) => {
  let { id_comment } = req.query;

  try {
    const comment = await Comment.findByPk(id_comment);

    const answers = await Comment.findAll({
      where: {
        belongs_to: comment.id,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Comment and answers Fetched Successfully",
      comment,
      answers,
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

module.exports = getCommentById;
