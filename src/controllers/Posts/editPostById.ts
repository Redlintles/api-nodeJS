import { Request, Response } from "express";

const Post = require("../../models/post.js");
const validateId = require("../../utils/validateId");

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const editPostById = async (req: ImageRequest, res: Response) => {
  const { id } = req.query;

  let postId = validateId(id);

  if (typeof postId === "string") {
    return res.status(400).json({
      error: true,
      message: postId,
    });
  }

  if (req.file && req.file.size > 500000) {
    res.status(400).json({
      error: true,
      message: "Image is too big(max size is 500kb)",
    });
  }

  const post = await Post.findByPk(postId);

  if (!post) {
    res.status(400).json({
      error: true,
      message: "Post not found for edit",
    });
  } else {
    const old = {
      id_author: post.id_author,
      title: post.title,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    const obj2 = Object.assign({}, old, {
      ...req.body,
    });

    if (req.file) {
      obj2["image"] = req.file.buffer;
    }
    await Post.update(obj2, {
      where: {
        id: postId,
      },
    });

    res.status(200).json({
      error: false,
      message: "Post Updated Successfully",
      old,
      new: obj2,
    });
  }
};

module.exports = editPostById;
