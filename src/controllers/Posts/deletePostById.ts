import { Request, Response } from "express";
const { Post } = require("../../utils/models");
const validateId = require("../../utils/validateId");

const deletePostById = async (req: Request, res: Response) => {
  const { id } = req.query;

  let postId = validateId(id);

  if (typeof postId === "string") {
    return res.status(400).json({
      error: true,
      message: postId,
    });
  }

  const post = await Post.findByPk(postId);

  if (!post) {
    return res.status(400).json({
      error: true,
      message: "Post Not Found",
    });
  } else {
    await Post.destroy({
      where: {
        id: postId,
      },
    });
    return res.status(200).json({
      error: false,
      post,
    });
  }
};

module.exports = deletePostById;
