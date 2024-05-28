import { Request, Response } from "express";

const { User, UserGroup, Group } = require("../../utils/models");

const getGroupsWithUser = async (req: Request, res: Response) => {
  const { id_user } = req.query;

  const targetUser = await User.findByPk(id_user);

  // Recebe os detalhes de todos os grupos em que um determinado usuário está
  const groupDetails = await UserGroup.findAll({
    where: {
      id_member: id_user,
    },
    attributes: [["id_group", "id"]],
  })
    .then((data: Array<any>) => {
      return data.map((group: any) => parseInt(group.id));
    })
    .then(async (data: Array<Number>) => {
      return await Group.findAll({
        where: {
          id: data,
        },
      });
    });

  return res.status(200).json({
    error: false,
    user: targetUser,
    groups: groupDetails,
  });
};

module.exports = getGroupsWithUser;
