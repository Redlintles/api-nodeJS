import { Request, Response } from "express";

const { Post } = require("../../utils/models");
const { User } = require("../../utils/models");

const validateId = require("../../utils/validateId");

const getPostsByUserId = async (req: Request, res: Response) => {
  const { id } = req.query;

  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "Usuário não encontrado",
    });
  } else {
    const posts = await Post.findAll({
      where: {
        id_author: userId,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Posts Encontrados com sucesso",
      posts,
    });
  }
};

module.exports = getPostsByUserId;
