import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { User, Tag, UserTag } = require("../../utils/models");

const userAddTag = async (req: Request, res: Response) => {
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

  if (!targetTag) {
    return res.status(400).json({
      error: true,
      message: "Tag Doesn't exists",
    });
  }
  if (!targetUser) {
    return res.status(400).json({
      error: true,
      message: "User Doesn't exists",
    });
  }

  const alreadyExists = await UserTag.findOne({
    where: {
      id_user: userId,
      id_tag: tagId,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já possuí esta tag",
    });
  }

  await UserTag.create({
    id_tag: tagId,
    id_user: userId,
  });

  return res.status(200).json({
    error: false,
    message: "Tag adicionada com sucesso",
  });
};

module.exports = userAddTag;
