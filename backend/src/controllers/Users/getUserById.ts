import { NextFunction, Request, Response } from "express";
const {
  User,
  Profile,
  UserFriends,
  UserFollower,
  sequelizeConn,
  UserTag,
  Tag,
} = require("../../utils/models");

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id_user } = req.query;

  const transaction = await sequelizeConn.transaction();

  try {
    const object = await User.findByPk(id_user);
    const profile = await Profile.findOne({ where: { id_user } });
    const friends = await UserFriends.findAll({
      where: { id_user },
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
      where: { id_followed: id_user },
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
        id_user,
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
      message: "User fetched successfully",
      user: object,
      profile,
      friends,
      followers,
      tags,
    });
  } catch (err: any) {
    await transaction.rollback();
    req.body.error = err;
    next();
  }
};

module.exports = getUserById;
