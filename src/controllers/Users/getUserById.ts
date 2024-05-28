import { Request, Response } from "express";
const {
  User,
  Profile,
  UserFriends,
  UserFollower,
  sequelizeConn,
  UserTag,
  Tag,
} = require("../../utils/models");

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.query;

  const transaction = await sequelizeConn.transaction();

  try {
    const object = await User.findByPk(id);
    const profile = await Profile.findOne({ where: { id_user: id } });
    const friends = await UserFriends.findAll({
      where: { id_user: id },
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
      where: { id_followed: id },
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

    const tags = await UserTag.findAll({
      where: {
        id_user: id,
      },
      attributes: [["id_tag", "id"]],
    })
      .then((data: any[]) => data.map((item: any) => parseInt(item.id)))
      .then((data: number[]) => {
        return Tag.findAll({
          where: {
            id: data,
          },
          attributes: ["tag_name"],
        });
      })
      .then((data: any[]) => data.map((item: any) => item.tag_name));

    await transaction.commit();

    return res.status(200).json({
      error: false,
      user: object,
      profile,
      friends,
      followers,
      tags,
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
