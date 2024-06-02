import { NextFunction, Request, Response } from "express";

const { Group } = require("../../utils/models");

const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userGroups = await Group.findAll({});

    if (userGroups.length === 0) {
      return res.status(200).json({
        error: false,
        message: "Nenhum Grupo fora criado ainda",
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

module.exports = getAllGroups;
