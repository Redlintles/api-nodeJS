import { NextFunction, Request, Response } from "express";

const { User, Group, sequelizeConn, UserGroup } = require("../../utils/models");
const validateId = require("../../utils/validateId");

const { sequelizeErrorLogger } = require("../../utils/logger");
const { isInRange } = require("../../utils/stringUtils");

interface FileImportantProps {
  size: number;
  buffer: any;
}
interface ImageRequest extends Request {
  file?: FileImportantProps;
}

const createGroup = async (
  req: ImageRequest,
  res: Response,
  next: NextFunction
) => {
  const { admin_id } = req.query;
  const { group_name, group_desc } = req.body;
  const max_size = process.env.MAX_FILE_SIZE
    ? parseInt(process.env.MAX_FILE_SIZE)
    : 500000;

  if (req.file && req.file.size > max_size) {
    return res.status(400).json({
      error: true,
      message: "Image is too big(max 500kb)",
    });
  }
  if (!isInRange(group_name, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Group name must have max 30 character length",
    });
  }
  if (!isInRange(group_desc, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "Group description must have max 200 character length",
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
      message: "The user has already created a group with that name",
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
      message: "Grupo created successfully",
      obj: newGroup,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = createGroup;
