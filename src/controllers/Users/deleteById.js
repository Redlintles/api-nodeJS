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
var _a = require("../../utils/models"), User = _a.User, Profile = _a.Profile, sequelizeConn = _a.sequelizeConn;
var validateId = require("../../utils/validateId");
var deleteById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, transaction, object, profile, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.query.id;
                userId = validateId(id);
                if (typeof userId === "string") {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: userId,
                        })];
                }
                return [4 /*yield*/, sequelizeConn.transaction()];
            case 1:
                transaction = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 10]);
                return [4 /*yield*/, User.findByPk(userId)];
            case 3:
                object = _b.sent();
                return [4 /*yield*/, Profile.findOne({
                        where: {
                            id_user: userId,
                        },
                    })];
            case 4:
                profile = _b.sent();
                return [4 /*yield*/, profile.destroy()];
            case 5:
                _b.sent();
                return [4 /*yield*/, object.destroy()];
            case 6:
                _b.sent();
                return [4 /*yield*/, transaction.commit()];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "User deleted succesfully",
                        user: object,
                    })];
            case 8:
                _a = _b.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 9:
                _b.sent();
                return [2 /*return*/, res.status(400).json({
                        error: true,
                        message: "User Not Found",
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); };
module.exports = deleteById;
