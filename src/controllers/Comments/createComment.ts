import { Request, Response } from "express";
const Comment = require("../../models/comment.js");
const validateId = require("../../utils/validateId");
const { isInRange } = require("../../utils/stringUtils");
const User = require("../../models/user");
const Post = require("../../models/post");

const createComment = async (req: Request, res: Response) => {
  let { id_author, id_post, belongs_to, comment } = req.body;

  id_post = validateId(id_post);

  if (typeof id_post === "string") {
    return res.status(400).json({
      error: true,
      message: id_post,
    });
  }

  id_author = validateId(id_author);

  if (typeof id_author === "string") {
    return res.status(400).json({
      error: true,
      message: id_author,
    });
  }

  belongs_to = validateId(belongs_to);

  if (typeof belongs_to === "number") {
    const comment = await Comment.findByPk(belongs_to);

    if (!comment) {
      return res.send(400).json({
        error: true,
        message: "Comment is not defined",
      });
    }
  } else {
    belongs_to = null;
  }

  const author = await User.findByPk(id_author);
  const post = await Post.findByPk(id_post);

  if (!author) {
    return res.status(400).json({
      error: true,
      message: "Autor do post não existe",
    });
  }

  if (!post) {
    return res.status(400).json({
      error: true,
      message: "Post Não existe",
    });
  }

  if (!isInRange(comment, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Tamanho máximo para um comentário é de 200 caracteres",
    });
  }

  const register = await Comment.create({
    id_post,
    id_author,
    comment,
    belongs_to,
  });

  return res.status(200).json({
    error: false,
    message: "Comment Created Successfully",
    comment: register,
  });
};

module.exports = createComment;
