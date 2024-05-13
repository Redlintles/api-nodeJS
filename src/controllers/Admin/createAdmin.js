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
var uuid_1 = require("uuid");
var userValidation = require("../../utils/stringUtils").userValidation;
var Admin = require("../../utils/models").Admin;
var createAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, newApiKey, _a, username, password, validateUsername, validatePassword, isNotDefined, root, admin;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                apiKey = req.headers["x-api-key"];
                newApiKey = (0, uuid_1.v4)();
                _a = req.body, username = _a.username, password = _a.password;
                validateUsername = userValidation.validateUsername, validatePassword = userValidation.validatePassword;
                isNotDefined = [username, password].includes(undefined);
                return [4 /*yield*/, Admin.findOne({ where: { "api-key": apiKey } })];
            case 1:
                root = _b.sent();
                if (root && root.username !== "root") {
                    return [2 /*return*/, res.status(401).json({
                            error: true,
                            message: "Only root can create admins",
                        })];
                }
                if (isNotDefined) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Username or password not defined",
                        })];
                }
                if (!validateUsername(username)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Username not valid",
                        })];
                }
                if (!validatePassword(password)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Password is too weak",
                        })];
                }
                return [4 /*yield*/, Admin.create({
                        username: username,
                        password: password,
                        "api-key": newApiKey,
                    })];
            case 2:
                admin = _b.sent();
                if (admin) {
                    return [2 /*return*/, res.status(200).json({
                            error: false,
                            message: "Admin Created Successfully",
                            admin: admin,
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            error: true,
                            message: "An Unexpected error ocurred, please try later",
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
module.exports = createAdmin;
