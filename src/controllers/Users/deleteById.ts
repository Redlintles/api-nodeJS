import { Request, Response } from "express";
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

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.query;

  const transaction = await sequelizeConn.transaction();

  try {
    await UserFriends.destroy({
      where: {
        id_user: id,
      },
    });

    await Comment.destroy({
      where: {
        id_author: id,
      },
    });

    await UserGroup.destroy({
      where: {
        id_member: id,
      },
    });
    await Group.destroy({
      where: {
        admin_id: id,
      },
    });
    await PostLikes.destroy({
      where: {
        id_user: id,
      },
    });
    await Post.destroy({
      where: {
        id_author: id,
      },
    });

    await UserFollower.destroy({
      where: {
        id_followed: id,
      },
    });

    await Profile.destroy({
      where: {
        id_user: id,
      },
    });

    await UserTag.destroy({
      where: {
        id_user: id,
      },
    });

    await User.destroy({
      where: {
        id: id,
      },
    });

    await transaction.commit();

    return res.status(200).json({
      error: false,
      message: "User deleted succesfully",
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      error: true,
      message: "User does not exists",
    });
  }
};

module.exports = deleteById;
