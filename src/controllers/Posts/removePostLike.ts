import { Request, Response } from "express";

const { PostLikes } = require("../../utils/models");

const removePostLike = async (req: Request, res: Response) => {
  const { id_user, id_post } = req.body;

  const likeExists = await PostLikes.findOne({
    where: {
      id_post,
      id_user,
    },
  });

  if (!likeExists) {
    return res.status(400).json({
      error: true,
      message: "O Usuário especificado não curtiu esse post",
    });
  }

  await likeExists.destroy();

  return res.status(200).json({
    error: false,
    message: "Like Removido com sucesso",
    obj: likeExists,
  });
};

module.exports = removePostLike;
