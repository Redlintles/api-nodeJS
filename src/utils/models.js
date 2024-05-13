"use strict";
var db = require("./db");
var Datatypes = require("sequelize").Datatypes;
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
