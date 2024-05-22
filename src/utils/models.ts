const db = require("./db");
import { DataTypes } from "sequelize";

const adminFn = require("../models/admin.js");
const commentFn = require("../models/comment.js");
const groupFn = require("../models/group.js");
const postLikesFn = require("../models/post_likes.js");
const postFn = require("../models/post.js");
const profileFn = require("../models/profile.js");
const tagFn = require("../models/tag.js");
const userFollowerFn = require("../models/user_follower.js");
const userFriendsFn = require("../models/user_friends.js");
const userGroupFn = require("../models/user_group.js");
const userTagFn = require("../models/user_tag.js");
const userFn = require("../models/user.js");

module.exports = {
  Admin: adminFn(db, DataTypes),
  Comment: commentFn(db, DataTypes),
  Group: groupFn(db, DataTypes),
  Post: postFn(db, DataTypes),
  User: userFn(db, DataTypes),
  Tag: tagFn(db, DataTypes),
  PostLikes: postLikesFn(db, DataTypes),
  Profile: profileFn(db, DataTypes),
  UserFollower: userFollowerFn(db, DataTypes),
  UserFriends: userFriendsFn(db, DataTypes),
  UserGroup: userGroupFn(db, DataTypes),
  UserTag: userTagFn(db, DataTypes),
  sequelizeConn: db,
};
