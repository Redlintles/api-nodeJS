import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const Comment = require("../../models/comment.js");

const deleteCommentById = async (req: Request, res: Response) => {
  let { id: commentId } = req.query;

  commentId = validateId(commentId);

  if (typeof commentId === "string") {
    return res.status(400).json({
      error: true,
      message: commentId,
    });
  }

  const register = await Comment.findByPk(commentId);

  if (!register) {
    return res.status(400).json({
      error: true,
      message: "Comentário não existe",
    });
  } else {
    await Comment.destroy({
      where: {
        belongs_to: register.id,
      },
    });
    await register.destroy();

    return res.status(200).json({
      error: false,
      message: "Comentário e respostas removidas com sucesso",
    });
  }
};

module.exports = deleteCommentById;
