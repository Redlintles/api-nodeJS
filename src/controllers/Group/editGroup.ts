import { Request, Response } from "express";

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const { isInRange } = require("../../utils/stringUtils");
const { Group } = require("../../utils/models");

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

  const group = await Group.findOne({
    where: {
      id: group_id,
      admin_id: admin_id,
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
      admin_id,
      id: group_id,
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
