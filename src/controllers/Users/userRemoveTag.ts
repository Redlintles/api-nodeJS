import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { User, Tag, UserTag } = require("../../utils/models");

const userRemoveTag = async (req: Request, res: Response) => {
  const { id_tag, id_user } = req.body;

  const tagId = validateId(id_tag);
  const userId = validateId(id_user);

  if (typeof tagId === "string") {
    return res.status(400).json({
      error: true,
      message: tagId,
    });
  }
  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const targetUser = await User.findByPk(userId);
  const targetTag = await Tag.findByPk(tagId);

  if (!targetUser) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }

  if (!targetTag) {
    return res.status(400).json({
      error: true,
      message: "Tag não existe",
    });
  }

  const targetRelationship = await UserTag.findOne({
    where: {
      id_tag: tagId,
      id_user: userId,
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
