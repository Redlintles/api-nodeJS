import { Request, Response } from "express";

const { isInRange } = require("../../utils/stringUtils");

const validateId = require("../../utils/validateId");

const { User, Group, UserGroup, sequelizeConn } = require("../../utils/models");
const deleteGroup = async (req: Request, res: Response) => {
  const { group_name, admin_id } = req.body;

  let userId = validateId(admin_id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  if (!isInRange(group_name, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Nome de grupo muito longo",
    });
  }

  const groupOwner = await User.findByPk(admin_id);

  if (!groupOwner) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }

  const group = await Group.findOne({
    where: {
      admin_id: admin_id,
      group_name: group_name,
    },
  });

  if (!group) {
    return res.status(400).json({
      error: true,
      message: "Grupo não existe",
    });
  }

  const transaction = await sequelizeConn.transaction();

  try {
    await UserGroup.destroy({
      where: {
        id_member: admin_id,
        id_group: group.id,
      },
    });
    await group.destroy();

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "Grupo Excluído com sucesso",
    });
  } catch {
    await transaction.rollback();
    return res.status(500).json({
      error: true,
      message:
        "O Grupo não pode ser excluído por algum motivo desconhecido, tente novamente mais tarde",
    });
  }
};

module.exports = deleteGroup;
