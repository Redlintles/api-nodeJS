import { Request, Response } from "express";
const validateId = require("../../utils/validateId");
const { Group, UserGroup, User } = require("../../utils/models");

const getGroupById = async (req: Request, res: Response) => {
  const { id_group } = req.query;

  const groupId = validateId(id_group);

  if (typeof groupId === "string") {
    return res.status(400).json({
      error: true,
      message: groupId,
    });
  }
  const targetGroup = await Group.findByPk(groupId);

  if (!targetGroup) {
    return res.status(400).json({
      error: true,
      message: "Grupo Não existe",
    });
  }

  // Get Details of every user in the specified group
  const userDetails = await UserGroup.findAll({
    where: {
      id_group: groupId,
    },
    attributes: [["id_member", "id"]],
  })
    .then((data: Array<any>) => {
      return data.map((obj: any) => parseInt(obj.id));
    })
    .then(async (data: Array<Number>) => {
      return await User.findAll({
        where: {
          id: data,
        },
      });
    });

  return res.status(200).json({
    error: false,
    group: targetGroup,
    members: userDetails,
  });
};

module.exports = getGroupById;
