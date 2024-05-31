import { Request, Response } from "express";

const { Comment } = require("../../utils/models");

const getCommentById = async (req: Request, res: Response) => {
  let { id_comment } = req.query;

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
};

module.exports = getCommentById;
