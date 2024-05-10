import { Request, Response } from "express";

const Comment = require("../../models/comment.js");
const validateId = require("../../utils/validateId");
const { isInRange } = require("../../utils/stringUtils");

const editComment = async (req: Request, res: Response) => {
  let { id } = req.query;
  let { comment: text } = req.body;

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
      message: "Comentário não existe",
    });
  }
  if (!isInRange(text, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Comentário muito grande(máximo 200 caracteres)",
    });
  }

  await Comment.update(
    {
      comment: text,
    },
    {
      where: {
        id: commentId,
      },
    }
  );

  return res.status(200).json({
    error: false,
    message: "Comment Updated Successfully",
    old: comment,
    new: Object.assign({}, comment.dataValues, { comment: text }),
  });
};

module.exports = editComment;
