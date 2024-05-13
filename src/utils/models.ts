const db = require("./db");
const { Datatypes } = require("sequelize");

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
  Admin: adminFn(db, Datatypes),
  Comment: commentFn(db, Datatypes),
  Group: groupFn(db, Datatypes),
  Post: postFn(db, Datatypes),
  User: userFn(db, Datatypes),
  Tag: tagFn(db, Datatypes),
  PostLikes: postLikesFn(db, Datatypes),
  Profile: profileFn(db, Datatypes),
  UserFollower: userFollowerFn(db, Datatypes),
  UserFriends: userFriendsFn(db, Datatypes),
  UserGroup: userGroupFn(db, Datatypes),
  UserTag: userTagFn(db, Datatypes),
};
