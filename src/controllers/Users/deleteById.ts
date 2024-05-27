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
    console.log(userId);
    await UserFriends.destroy({
      where: {
        id_user: userId,
      },
    });

    await Comment.destroy({
      where: {
        id_author: userId,
      },
    });

    await UserGroup.destroy({
      where: {
        id_member: userId,
      },
    });
    await Group.destroy({
      where: {
        admin_id: userId,
      },
    });
    await PostLikes.destroy({
      where: {
        id_user: userId,
      },
    });
    await Post.destroy({
      where: {
        id_author: userId,
      },
    });

    await UserFollower.destroy({
      where: {
        id_followed: userId,
      },
    });

    await Profile.destroy({
      where: {
        id_user: userId,
      },
    });

    await UserTag.destroy({
      where: {
        id_user: userId,
      },
    });

    await User.destroy({
      where: {
        id: userId,
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
