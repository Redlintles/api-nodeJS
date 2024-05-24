import { Request, Response } from "express";

const { UserGroup, Group, User } = require("../../utils/models");
const validateId = require("../../utils/validateId");

const addMember = async (req: Request, res: Response) => {
  const { id_user, id_group } = req.body;

  const userId = validateId(id_user);
  const groupId = validateId(id_group);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  if (typeof groupId === "string") {
    return res.status(400).json({
      error: true,
      message: groupId,
    });
  }

  const userToAdd = await User.findByPk(userId);
  const groupToBelong = await Group.findByPk(groupId);

  if (!userToAdd) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }
  if (!groupToBelong) {
    return res.status(400).json({
      error: true,
      message: "Grupo não existe",
    });
  }

  const obj = await UserGroup.create({
    id_member: userId,
    id_group: groupId,
  });

  if (!obj) {
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro inesperado",
    });
  }

  return res.status(200).json({
    error: false,
    message: "Usuário adicionado ao grupo com sucesso",
    obj,
  });
};

module.exports = addMember;
