import { Request, Response } from "express";

const { isInRange } = require("../../utils/stringUtils");

const { sequelizeErrorLogger } = require("../../utils/logger");

const { Group, UserGroup, sequelizeConn } = require("../../utils/models");
const deleteGroup = async (req: Request, res: Response) => {
  const { group_name, admin_id } = req.query;

  if (!isInRange(group_name, 0, 30)) {
    return res.status(400).json({
      error: true,
      message: "Group name is too long(max 30 characters)",
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
      message: "Group does not exists",
    });
  }

  const transaction = await sequelizeConn.transaction();

  try {
    await UserGroup.destroy({
      where: {
        id_group: group.id,
      },
    });
    await group.destroy();

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "Group deleted successfully",
    });
  } catch (err: any) {
    await transaction.rollback();
    sequelizeErrorLogger.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = deleteGroup;
