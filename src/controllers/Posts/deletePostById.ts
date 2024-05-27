import { Request, Response } from "express";
const {
  Post,
  PostLikes,
  sequelizeConn,
  Comment,
} = require("../../utils/models");
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
  }

  const transaction = await sequelizeConn.transaction();

  try {
    await Comment.destroy({
      where: {
        id_post: postId,
      },
    });

    await PostLikes.destroy({
      where: {
        id_post: postId,
      },
    });
    await Post.destroy({
      where: {
        id: postId,
      },
    });

    await transaction.commit();
    return res.status(200).json({
      error: false,
      post,
    });
  } catch {
    await transaction.rollback();
    return res.status(500).json({
      error: true,
      message: "O Post não pode ser exclúido por algum motivo desconhecido",
    });
  }
};

module.exports = deletePostById;
