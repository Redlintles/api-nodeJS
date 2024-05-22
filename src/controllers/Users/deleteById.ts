import { Request, Response } from "express";
const { User, Profile, sequelizeConn } = require("../../utils/models");

const validateId = require("../../utils/validateId");

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.query;

  let userId = validateId(id);

  if (typeof userId === "string") {
    return res.status(400).json({
      error: true,
      message: userId,
    });
  }

  const transaction = await sequelizeConn.transaction();

  try {
    const object = await User.findByPk(userId);

    const profile = await Profile.findOne({
      where: {
        id_user: userId,
      },
    });

    await profile.destroy();
    await object.destroy();

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "User deleted succesfully",
      user: object,
    });
  } catch {
    await transaction.rollback();
    return res.status(400).json({
      error: true,
      message: "User Not Found",
    });
  }
};

module.exports = deleteById;
