import { Request, Response } from "express";
const { Comment } = require("../../utils/models");
const validateId = require("../../utils/validateId");
const { isInRange } = require("../../utils/stringUtils");
const { User } = require("../../utils/models");
const { Post } = require("../../utils/models");

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

  if (belongs_to) {
    belongs_to = validateId(belongs_to);

    if (typeof belongs_to === "string") {
      return res.status(400).json({
        error: true,
        message: belongs_to,
      });
    }
  } else {
    belongs_to = null;
  }
  if (belongs_to) {
    const origin = await Comment.findByPk(belongs_to);

    if (!origin) {
      return res.status(400).json({
        error: true,
        message: "Origin comment does not exists",
      });
    }

    if (origin.belongs_to) {
      return res.status(400).json({
        error: true,
        message: "An answer cannot belong to another answer",
      });
    }
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
