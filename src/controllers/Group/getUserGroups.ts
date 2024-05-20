import { Request, Response } from "express";

const validateId = require("../../utils/validateId");

const { User, Group } = require("../../utils/models");

const getUserGroups = async (req: Request, res: Response) => {
  const { id } = req.query;
  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const owner = await User.findByPk(userId);

  if (!owner) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }

  const userGroups = await Group.findAll({
    where: {
      admin_id: userId,
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
};

module.exports = getUserGroups;
