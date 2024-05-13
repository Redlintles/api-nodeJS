"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("./db");
var sequelize_1 = require("sequelize");
var adminFn = require("../models/admin.js");
var commentFn = require("../models/comment.js");
var groupFn = require("../models/group.js");
var postLikesFn = require("../models/post_likes.js");
var postFn = require("../models/post.js");
var profileFn = require("../models/profile.js");
var tagFn = require("../models/tag.js");
var userFollowerFn = require("../models/user_follower.js");
var userFriendsFn = require("../models/user_friends.js");
var userGroupFn = require("../models/user_group.js");
var userTagFn = require("../models/user_tag.js");
var userFn = require("../models/user.js");
module.exports = {
    Admin: adminFn(db, sequelize_1.DataTypes),
    Comment: commentFn(db, sequelize_1.DataTypes),
    Group: groupFn(db, sequelize_1.DataTypes),
    Post: postFn(db, sequelize_1.DataTypes),
    User: userFn(db, sequelize_1.DataTypes),
    Tag: tagFn(db, sequelize_1.DataTypes),
    PostLikes: postLikesFn(db, sequelize_1.DataTypes),
    Profile: profileFn(db, sequelize_1.DataTypes),
    UserFollower: userFollowerFn(db, sequelize_1.DataTypes),
    UserFriends: userFriendsFn(db, sequelize_1.DataTypes),
    UserGroup: userGroupFn(db, sequelize_1.DataTypes),
    UserTag: userTagFn(db, sequelize_1.DataTypes),
};
