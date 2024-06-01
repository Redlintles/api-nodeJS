import { Request, Response } from "express";

const { Comment } = require("../../utils/models");
const { isInRange } = require("../../utils/stringUtils");
const { sequelizeErrorLogger } = require("../../utils/logger");

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

module.exports = editComment;
