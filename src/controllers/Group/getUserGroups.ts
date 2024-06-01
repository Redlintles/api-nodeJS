import { NextFunction, Request, Response } from "express";

const { Group } = require("../../utils/models");

const getUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_user } = req.query;

  try {
    const userGroups = await Group.findAll({
      where: {
        admin_id: id_user,
      },
    });

    if (userGroups.length === 0) {
      return res.status(200).json({
        error: false,
        message: "O Usuário não possuí grupos",
        groups: userGroups,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Grupos resgatados com sucesso",
        groups: userGroups,
      });
    }
  } catch (err: any) {
    req.body.error = err;
    next();
  }
};

module.exports = getUserGroups;
