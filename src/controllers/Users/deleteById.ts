import { NextFunction, Request, Response } from "express";
const {
  User,
  Profile,
  UserFriends,
  UserFollower,
  Group,
  UserGroup,
  Comment,
  Post,
  PostLikes,
  sequelizeConn,
  UserTag,
} = require("../../utils/models");

const { Op } = require("sequelize");

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const { id_user } = req.query;

  const transaction = await sequelizeConn.transaction();

  try {
    await UserFriends.destroy({
      where: {
        [Op.or]: [{ id_user: id_user }, { id_friend: id_user }],
      },
    });

    await Comment.destroy({
      where: {
        id_author: id_user,
      },
    });

    await UserGroup.destroy({
      where: {
        id_member: id_user,
      },
    });
    await Group.destroy({
      where: {
        admin_id: id_user,
      },
    });
    await PostLikes.destroy({
      where: {
        id_user: id_user,
      },
    });
    await Post.destroy({
      where: {
        id_author: id_user,
      },
    });

    await UserFollower.destroy({
      where: {
        [Op.or]: [{ id_followed: id_user }, { id_follower: id_user }],
      },
    });

    await Profile.destroy({
      where: {
        id_user: id_user,
      },
    });

    await UserTag.destroy({
      where: {
        id_user: id_user,
      },
    });

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
