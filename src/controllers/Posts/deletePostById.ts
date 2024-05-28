import { Request, Response } from "express";
const {
  Post,
  PostLikes,
  sequelizeConn,
  Comment,
} = require("../../utils/models");

const deletePostById = async (req: Request, res: Response) => {
  const { id } = req.query;

  const post = await Post.findByPk(id);

  const transaction = await sequelizeConn.transaction();

  try {
    await Comment.destroy({
      where: {
        id_post: id,
      },
    });

    await PostLikes.destroy({
      where: {
        id_post: id,
      },
    });
    await Post.destroy({
      where: {
        id: id,
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
