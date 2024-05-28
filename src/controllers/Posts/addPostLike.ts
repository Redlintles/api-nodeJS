import { Request, Response } from "express";

const { PostLikes } = require("../../utils/models");

const addPostLike = async (req: Request, res: Response) => {
  const { id_post, id_user } = req.body;

  const hasAlreadyLiked = await PostLikes.findOne({
    where: {
      id_post,
      id_user,
    },
  });

  if (hasAlreadyLiked) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já curtiu o post especificado",
    });
  }

  const like = await PostLikes.create({
    id_post,
    id_user,
  });

  return res.status(200).json({
    error: false,
    message: "Like Adicionado com sucesso",
    obj: like,
  });
};

module.exports = addPostLike;
