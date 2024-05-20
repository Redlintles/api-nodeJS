import { Request, Response } from "express";

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const { isInRange } = require("../../utils/stringUtils");
const validateId = require("../../utils/validateId");
const { User, Group } = require("../../utils/models");

const editGroup = async (req: ImageRequest, res: Response) => {
  const { group_id, admin_id, group_name, group_desc } = req.body;

  const maxSize = process.env.MAX_IMAGE_SIZE
    ? parseInt(process.env.MAX_IMAGE_SIZE)
    : 500000;

  if (req.file && req.file.size > maxSize) {
    return res.status(400).json({
      error: true,
      message: "A Mensagem é muito grande",
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
      message: "Usuário Não Existe",
    });
  }

  let groupId = validateId(group_id);

  if (typeof groupId === "string") {
    return res.status(400).json({
      error: true,
      message: groupId,
    });
  }
  const group = await Group.findOne({
    where: {
      id: groupId,
      admin_id: userId,
    },
  });

  if (!group) {
    return res.status(400).json({
      error: true,
      message: "Grupo Não existe",
    });
  }

  if (group_name && !isInRange(group_name, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Nome de grupo muito longo",
    });
  }
  if (group_desc && !isInRange(group_desc, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Nome de grupo muito longo",
    });
  }

  const obj = {
    group_name: group_name ? group_name : group.group_name,
    group_desc: group_desc ? group_desc : group.group_desc,
    group_banner: req.file ? req.file.buffer : group.group_banner,
  };

  await Group.update(obj, {
    where: {
      admin_id: userId,
      id: groupId,
    },
  });

  return res.status(200).json({
    error: false,
    message: "Grupo atualizado com sucesso",
    old: group,
    new: obj,
  });
};

module.exports = editGroup;
