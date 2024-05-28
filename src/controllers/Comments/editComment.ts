import { Request, Response } from "express";

const { Comment } = require("../../utils/models");
const { isInRange } = require("../../utils/stringUtils");

const editComment = async (req: Request, res: Response) => {
  let { id } = req.query;
  let { comment: text } = req.body;

  const comment = await Comment.findByPk(id);

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
        id,
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
