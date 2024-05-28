import { Request, Response } from "express";

const { User, Group, sequelizeConn, UserGroup } = require("../../utils/models");
const validateId = require("../../utils/validateId");
const { isInRange } = require("../../utils/stringUtils");

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const createGroup = async (req: ImageRequest, res: Response) => {
  const { admin_id, group_name, group_desc } = req.body;
  const max_size = process.env.MAX_FILE_SIZE
    ? parseInt(process.env.MAX_FILE_SIZE)
    : 500000;

  if (req.file && req.file.size > max_size) {
    return res.status(400).json({
      error: true,
      message: "A imagem é muito grande",
    });
  }
  if (!isInRange(group_desc, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Nome do grupo deve ter no máximo 30 caracteres",
    });
  }
  if (!isInRange(group_name, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Descrição do grupo deve ter no máximo 200 caracteres",
    });
  }

  const groups = await Group.findAll({
    where: {
      admin_id,
    },
    attributes: ["group_name"],
  });

  if (groups.map((g: any) => g.group_name).includes(group_name)) {
    return res.status(400).json({
      error: true,
      message: "Você já criou um grupo com este nome",
    });
  }

  const transaction = await sequelizeConn.transaction();

  try {
    const newGroup = await Group.create({
      admin_id,
      group_name,
      group_desc,
      group_banner: req.file ? req.file.buffer : undefined,
    });

    await UserGroup.create({
      id_group: newGroup.id,
      id_member: admin_id,
    });

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "Grupo criado com sucesso",
      obj: newGroup,
    });
  } catch {
    await transaction.rollback();
  }
};

module.exports = createGroup;
