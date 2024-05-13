import { Request, Response } from "express";

const { Post } = require("../../utils/models");

const validateId = require("../../utils/validateId");

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.query;

  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const post = await Post.findByPk(userId);

  if (!post) {
    return res.status(400).json({
      error: true,
      message: "Post not found",
    });
  } else {
    return res.status(200).json({
      error: false,
      message: "Post found successfully",
      post,
    });
  }
};

module.exports = getPostById;
