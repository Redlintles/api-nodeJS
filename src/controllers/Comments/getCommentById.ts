import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const Comment = require("../../models/comment.js");

const getCommentById = async (req: Request, res: Response) => {
  let { id } = req.query;

  let commentId = validateId(id);

  if (typeof commentId === "string") {
    return res.status(400).json({
      error: true,
      message: commentId,
    });
  }

  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    return res.status(400).json({
      error: true,
      message: "Comment not Found",
    });
  } else {
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
  }
};

module.exports = getCommentById;
