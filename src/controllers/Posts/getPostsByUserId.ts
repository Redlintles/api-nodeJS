import { Request, Response } from "express";

const { Post } = require("../../utils/models");

const getPostsByUserId = async (req: Request, res: Response) => {
  const { id } = req.query;

  const posts = await Post.findAll({
    where: {
      id_author: id,
    },
  });

  return res.status(200).json({
    error: false,
    message: "Posts Encontrados com sucesso",
    posts,
  });
};

module.exports = getPostsByUserId;
