import { Request, Response } from "express";

const { Group, User, UserGroup } = require("../../utils/models");

const deleteMember = async (req: Request, res: Response) => {
  const { id_member, id_group } = req.body;

  const targetGroup = await Group.findByPk(id_group);
  const targetUser = await User.findByPk(id_member);

  if (targetGroup.admin_id === targetUser.id) {
    return res.status(400).json({
      error: true,
      message: "O Dono não pode se excluir do grupo que criou",
    });
  }

  const groupMember = await UserGroup.findOne({
    where: {
      id_member,
      id_group,
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
