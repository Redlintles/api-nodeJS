import { NextFunction, Request, Response } from "express";

const { Comment } = require("../../utils/models");

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    req.body.error = err;
    next();
  }
};

module.exports = getCommentById;
