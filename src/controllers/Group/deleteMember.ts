import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { Group, User, UserGroup } = require("../../utils/models");

const deleteMember = async (req: Request, res: Response) => {
  const { id_member, id_group } = req.body;
  const userId = validateId(id_member);
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

  const targetGroup = await Group.findByPk(groupId);
  const targetUser = await User.findByPk(userId);

  if (targetGroup.admin_id === targetUser.id) {
    return res.status(400).json({
      error: true,
      message: "O Dono não pode se excluir do grupo que criou",
    });
  }

  if (!targetUser) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }

  if (!targetGroup) {
    return res.status(400).json({
      error: true,
      message: "Grupo Não existe",
    });
  }

  const groupMember = await UserGroup.findOne({
    where: {
      id_member: userId,
      id_group: groupId,
    },
  });

  if (!groupMember) {
    return res.status(400).json({
      error: true,
      message: "O Grupo não contém o usuário especificado",
    });
  }

  await groupMember.destroy();

  return res.status(200).json({
    error: false,
    message: "Usuário excluído com sucesso",
  });
};

module.exports = deleteMember;
