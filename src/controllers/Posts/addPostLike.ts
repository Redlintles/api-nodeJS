import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const { User, Post, PostLikes } = require("../../utils/models");

const addPostLike = async (req: Request, res: Response) => {
  const { id_post, id_user } = req.body;
  const userId = validateId(id_user);
  const postId = validateId(id_post);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }
  if (typeof postId === "string") {
    return res.status(400).json({
      error: true,
      message: postId,
    });
  }

  const targetPost = await Post.findByPk(postId);
  const targetUser = await User.findByPk(userId);

  if (!targetPost) {
    return res.status(400).json({
      error: true,
      message: "Post não existe",
    });
  }

  if (!targetUser) {
    return res.status(400).json({
      error: true,
      message: "Usuário Não existe",
    });
  }

  const hasAlreadyLiked = await PostLikes.findOne({
    where: {
      id_post: postId,
      id_user: userId,
    },
  });

  if (hasAlreadyLiked) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já curtiu o post especificado",
    });
  }

  const like = await PostLikes.create({
    id_post: postId,
    id_user: userId,
  });

  return res.status(200).json({
    error: false,
    message: "Like Adicionado com sucesso",
    obj: like,
  });
};

module.exports = addPostLike;
