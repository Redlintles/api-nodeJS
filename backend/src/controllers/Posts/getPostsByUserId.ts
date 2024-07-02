import { NextFunction, Request, Response } from "express";

const { Post } = require("../../utils/models");

const getPostsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = getPostsByUserId;
