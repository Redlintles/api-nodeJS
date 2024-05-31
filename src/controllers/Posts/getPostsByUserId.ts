import { Request, Response } from "express";

const { Post } = require("../../utils/models");

const getPostsByUserId = async (req: Request, res: Response) => {
  const { id_author } = req.query;

  try {
    const posts = await Post.findAll({
      where: {
        id_author,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Posts founds successfully",
      posts,
    });
  } catch {
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = getPostsByUserId;
