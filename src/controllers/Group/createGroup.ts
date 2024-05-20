import { Request, Response } from "express";

const { User, Group } = require("../../utils/models");
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

  let userId = validateId(admin_id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }
  const groupOwner = await User.findByPk(userId);

  if (!groupOwner) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
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
      admin_id: userId,
    },
    attributes: ["group_name"],
  });

  if (groups.map((g) => g.group_name).includes(group_name)) {
    return res.status(400).json({
      error: true,
      message: "Você já criou um grupo com este nome",
    });
  }

  const newGroup = await Group.create({
    admin_id: userId,
    group_name,
    group_desc,
    group_banner: req.file ? req.file.buffer : undefined,
  });

  if (!newGroup) {
    return res.status(400).json({
      error: true,
      message:
        "Houve algum erro ao criar o novo grupo, tente novamente mais tarde",
    });
  }
  return res.status(200).json({
    error: false,
    message: "Grupo criado com sucesso",
    obj: newGroup,
  });
};

module.exports = createGroup;
