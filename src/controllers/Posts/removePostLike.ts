import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { User, Post, PostLikes } = require("../../utils/models");

const removePostLike = async (req: Request, res: Response) => {
  const { id_user, id_post } = req.body;
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

  const likeExists = await PostLikes.findOne({
    where: {
      id_post: postId,
      id_user: userId,
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
