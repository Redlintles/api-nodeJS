import { Request, Response } from "express";
const { Comment } = require("../../utils/models");

const deleteCommentById = async (req: Request, res: Response) => {
  let { id: commentId } = req.query;

  const register = await Comment.findByPk(commentId);

  if (!register.belongs_to) {
    await Comment.destroy({
      where: {
        belongs_to: register.id,
      },
    });
  }
  await register.destroy();

  return res.status(200).json({
    error: false,
    message: "Comentário e respostas removidas com sucesso",
  });
};

module.exports = deleteCommentById;
