import { NextFunction, Request, Response } from "express";
const { Group, UserGroup, User } = require("../../utils/models");

const getGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_group } = req.query;

  try {
    const targetGroup = await Group.findByPk(id_group);

    if (!targetGroup) {
      return res.status(400).json({
        error: true,
        message: "Grupo Não existe",
      });
    }

    // Get Details of every user in the specified group
    const userDetails = await UserGroup.findAll({
      where: {
        id_group,
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
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = getGroupById;
