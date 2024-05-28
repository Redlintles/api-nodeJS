import { Request, Response } from "express";

const { UserTag } = require("../../utils/models");

const userAddTag = async (req: Request, res: Response) => {
  const { id_tag, id_user } = req.body;

  const alreadyExists = await UserTag.findOne({
    where: {
      id_user,
      id_tag,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já possuí esta tag",
    });
  }

  await UserTag.create({
    id_tag,
    id_user,
  });

  return res.status(200).json({
    error: false,
    message: "Tag adicionada com sucesso",
  });
};

module.exports = userAddTag;
