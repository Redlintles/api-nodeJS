import { NextFunction, Request, Response } from "express";

const { Comment } = require("../../utils/models");
const { isInRange } = require("../../utils/stringUtils");

const editComment = async (req: Request, res: Response, next: NextFunction) => {
  let { id_comment } = req.query;
  let { comment: text } = req.body;

  const comment = await Comment.findByPk(id_comment);

  if (!isInRange(text, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Comment is too big(max 200 characters)",
    });
  }

  try {
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
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = editComment;
