import { NextFunction, Request, Response } from "express";
const { User, sequelizeConn } = require("../../utils/models");

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const { id_user } = req.query;

  const transaction = await sequelizeConn.transaction();

  try {
    await User.destroy({
      where: {
        id: id_user,
      },
    });

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "User deleted succesfully",
    });
  } catch (err: any) {
    await transaction.rollback();
    req.body.error = err;
    next();
  }
};

module.exports = deleteById;
