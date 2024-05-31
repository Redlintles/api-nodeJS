import { Request, Response } from "express";

const { Group, User, UserGroup } = require("../../utils/models");

const deleteMember = async (req: Request, res: Response) => {
  const { id_member, id_group } = req.query;

  const targetGroup = await Group.findByPk(id_group);
  const targetUser = await User.findByPk(id_member);

  if (targetGroup.admin_id === targetUser.id) {
    return res.status(400).json({
      error: true,
      message: "The admin cannot delete himself from the group he created",
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
      message: "The group does not contain the specified user",
    });
  }

  await groupMember.destroy();

  return res.status(200).json({
    error: false,
    message: "User deleted successfully",
  });
};

module.exports = deleteMember;
