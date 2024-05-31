import { Request, Response } from "express";

const { UserGroup } = require("../../utils/models");

const addMember = async (req: Request, res: Response) => {
  const { id_member, id_group } = req.query;

  const isInGroup = await UserGroup.findOne({
    where: {
      id_member,
      id_group: id_group,
    },
  });

  if (isInGroup) {
    return res.status(400).json({
      error: true,
      message: "O Usuário já está no grupo",
    });
  }

  const obj = await UserGroup.create({
    id_member: id_member,
    id_group: id_group,
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
