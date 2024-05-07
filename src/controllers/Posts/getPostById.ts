import { Request, Response } from "express";

const Post = require("../../models/post.js");

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id is not defined",
    });
  }

  if (!/^\d+$/.test(id.toString())) {
    return res.status(400).json({
      error: true,
      message: "Id must be a number",
    });
  }
  let userId = parseInt(id.toString());

  const post = await Post.findByPk(userId);

  if(!post) {
    return res.status(400).json({
        error: true,
        message: "Post not found"
    })
  } else {
    return res.status(200).json({
        error: false,
        message: "Post found successfully",
        post,
    })
  }
};

module.exports = getPostById;
