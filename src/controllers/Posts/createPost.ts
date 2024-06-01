import { NextFunction, Request, Response } from "express";

const { isInRange } = require("../../utils/stringUtils");

const { Post } = require("../../utils/models");
const { User } = require("../../utils/models");
interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const createPost = async (
  req: ImageRequest,
  res: Response,
  next: NextFunction
) => {
  const maxSize: number = process.env.MAX_IMAGE_SIZE
    ? parseInt(process.env.MAX_IMAGE_SIZE)
    : 500000;
  if (req.file && req.file.size > maxSize) {
    res.status(400).json({
      error: true,
      message: "Imagem muito grande(max 500kb)",
    });
  }

  const obj = {
    id_author: req.query.id_author as string,
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.buffer : undefined,
  };

  const author = await User.findByPk(parseInt(obj.id_author));

  if (Object.values(obj).includes(undefined) && obj.image !== undefined) {
    return res.status(400).json({
      error: true,
      message: "Fields Missing",
    });
  }

  const lengthCheck = [
    isInRange(obj.title, 0, 50),
    isInRange(obj.content, 0, 200),
  ];

  if (lengthCheck.includes(false)) {
    return res.status(400).json({
      error: true,
      message:
        "Exceeded Max Fields Length(for title is 50, for content is 200)",
    });
  }

  try {
    const post = await Post.create(obj);

    return res.status(200).json({
      error: false,
      message: "Postagem criada com sucesso",
      author,
      post,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = createPost;
