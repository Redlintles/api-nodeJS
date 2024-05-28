import { Request, Response } from "express";

const { UserTag } = require("../../utils/models");

const userRemoveTag = async (req: Request, res: Response) => {
  const { id_tag, id_user } = req.body;

  const targetRelationship = await UserTag.findOne({
    where: {
      id_tag,
      id_user,
    },
  });

  if (!targetRelationship) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já não possuí a tag especificada",
    });
  }

  await targetRelationship.destroy();

  return res.status(200).json({
    error: false,
    message: "Tag removida com sucesso",
  });
};

module.exports = userRemoveTag;
