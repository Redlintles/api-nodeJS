"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("../../utils/models"), User = _a.User, Profile = _a.Profile, UserFriends = _a.UserFriends, UserFollower = _a.UserFollower, Group = _a.Group, UserGroup = _a.UserGroup, Comment = _a.Comment, Post = _a.Post, PostLikes = _a.PostLikes, sequelizeConn = _a.sequelizeConn, UserTag = _a.UserTag;
var Op = require("sequelize").Op;
var deleteById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user, transaction, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id_user = req.query.id_user;
                return [4 /*yield*/, sequelizeConn.transaction()];
            case 1:
                transaction = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 14, , 16]);
                return [4 /*yield*/, UserFriends.destroy({
                        where: (_a = {},
                            _a[Op.or] = [{ id_user: id_user }, { id_friend: id_user }],
                            _a),
                    })];
            case 3:
                _c.sent();
                return [4 /*yield*/, Comment.destroy({
                        where: {
                            id_author: id_user,
                        },
                    })];
            case 4:
                _c.sent();
                return [4 /*yield*/, UserGroup.destroy({
                        where: {
                            id_member: id_user,
                        },
                    })];
            case 5:
                _c.sent();
                return [4 /*yield*/, Group.destroy({
                        where: {
                            admin_id: id_user,
                        },
                    })];
            case 6:
                _c.sent();
                return [4 /*yield*/, PostLikes.destroy({
                        where: {
                            id_user: id_user,
                        },
                    })];
            case 7:
                _c.sent();
                return [4 /*yield*/, Post.destroy({
                        where: {
                            id_author: id_user,
                        },
                    })];
            case 8:
                _c.sent();
                return [4 /*yield*/, UserFollower.destroy({
                        where: (_b = {},
                            _b[Op.or] = [{ id_followed: id_user }, { id_follower: id_user }],
                            _b),
                    })];
            case 9:
                _c.sent();
                return [4 /*yield*/, Profile.destroy({
                        where: {
                            id_user: id_user,
                        },
                    })];
            case 10:
                _c.sent();
                return [4 /*yield*/, UserTag.destroy({
                        where: {
                            id_user: id_user,
                        },
                    })];
            case 11:
                _c.sent();
                return [4 /*yield*/, User.destroy({
                        where: {
                            id: id_user,
                        },
                    })];
            case 12:
                _c.sent();
                return [4 /*yield*/, transaction.commit()];
            case 13:
                _c.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "User deleted succesfully",
                    })];
            case 14:
                err_1 = _c.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 15:
                _c.sent();
                req.body.error = err_1;
                next();
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
module.exports = deleteById;
