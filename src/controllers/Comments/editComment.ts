import { Request, Response } from "express";

const { Comment } = require("../../utils/models");
const { isInRange } = require("../../utils/stringUtils");

const editComment = async (req: Request, res: Response) => {
  let { id_comment } = req.query;
  let { comment: text } = req.body;

  const comment = await Comment.findByPk(id_comment);

  if (!isInRange(text, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Comment is too big(max 200 characters)",
    });
  }

  await Comment.update(
    {
      comment: text,
    },
    {
      where: {
        id: id_comment,
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
