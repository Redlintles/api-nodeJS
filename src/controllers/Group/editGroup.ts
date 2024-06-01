import { NextFunction, Request, Response } from "express";

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const { isInRange } = require("../../utils/stringUtils");
const { Group } = require("../../utils/models");

const { sequelizeErrorLogger } = require("../../utils/logger");

const editGroup = async (
  req: ImageRequest,
  res: Response,
  next: NextFunction
) => {
  const { group_id, admin_id } = req.query;
  const { group_name, group_desc } = req.body;

  const maxSize = process.env.MAX_IMAGE_SIZE
    ? parseInt(process.env.MAX_IMAGE_SIZE)
    : 500000;

  if (req.file && req.file.size > maxSize) {
    return res.status(400).json({
      error: true,
      message: "The image is too big(max 500kb)",
    });
  }

  const group = await Group.findOne({
    where: {
      id: group_id,
      admin_id,
    },
  });

  if (!group) {
    return res.status(400).json({
      error: true,
      message: "Group does not exists",
    });
  }

  if (group_name && !isInRange(group_name, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Group name is too long",
    });
  }
  if (group_desc && !isInRange(group_desc, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Group desc is too long",
    });
  }

  try {
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
      message: "Grupo updated successfully",
      old: group,
      new: obj,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = editGroup;
