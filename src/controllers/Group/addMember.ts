import { NextFunction, Request, Response } from "express";

const { UserGroup } = require("../../utils/models");
const { sequelizeErrorLogger } = require("../../utils/logger");

const addMember = async (req: Request, res: Response, next: NextFunction) => {
  const { id_member, id_group } = req.query;

  const isInGroup = await UserGroup.findOne({
    where: {
      id_member,
      id_group: id_group,
    },
  });

  if (isInGroup) {
    return res.status(400).json({
      error: true,
      message: "The user is already in the group",
    });
  }

  try {
    const obj = await UserGroup.create({
      id_member: id_member,
      id_group: id_group,
    });

    return res.status(200).json({
      error: false,
      message: "Group user added successfully",
      obj,
    });
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = addMember;
