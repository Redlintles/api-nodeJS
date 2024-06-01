import { NextFunction, Request, Response } from "express";

const { Post } = require("../../utils/models");

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const editPostById = async (
  req: ImageRequest,
  res: Response,
  next: NextFunction
) => {
  const { id_post } = req.query;

  const maxSize: number = process.env.MAX_IMAGE_SIZE
    ? parseInt(process.env.MAX_IMAGE_SIZE)
    : 500000;

  if (req.file && req.file.size > maxSize) {
    res.status(400).json({
      error: true,
      message: "Image is too big(max size is 500kb)",
    });
  }

  try {
    const post = await Post.findByPk(id_post);

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
    await Post.update(
      {
        ...obj2,
        id_author: old.id_author,
      },
      {
        where: {
          id: id_post,
        },
      }
    );

    return res.status(200).json({
      error: false,
      message: "Post Updated Successfully",
      old,
      new: obj2,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = editPostById;
