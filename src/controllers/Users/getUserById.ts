import { Request, Response } from "express";
const {
  User,
  Profile,
  UserFriends,
  UserFollower,
  sequelizeConn,
} = require("../../utils/models");

const validateId = require("../../utils/validateId");

const getUserById = async (req: Request, res: Response) => {
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
    const profile = await Profile.findOne({ where: { id_user: userId } });
    const friends = await UserFriends.findAll({
      where: { id_user: userId },
      attributes: [["id_friend", "id"]],
    })
      .then((data: any[]) => {
        return data.map((item: any) => parseInt(item.id));
      })
      .then((data: number[]) => {
        return User.findAll({
          where: {
            id: data,
          },
        });
      });
    const followers = await UserFollower.findAll({
      where: { id_followed: userId },
      attributes: [["id_follower", "id"]],
    })
      .then((data: any[]) => {
        return data.map((item: any) => parseInt(item.id));
      })
      .then((data: number[]) => {
        return User.findAll({
          where: {
            id: data,
          },
        });
      });

    await transaction.commit();

    return res.status(200).json({
      error: false,
      user: object,
      profile,
      friends,
      followers,
    });
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "Ocorreu um erro inesperado",
    });
  }
};

module.exports = getUserById;
