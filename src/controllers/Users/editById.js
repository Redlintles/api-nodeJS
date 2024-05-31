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
var User = require("../../utils/models").User;
var validateEditObj = require("../../utils/validateEditObj");
var editById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user, object, old, result, after, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_user = req.query.id_user;
                return [4 /*yield*/, User.findByPk(id_user)];
            case 1:
                object = _b.sent();
                old = {
                    username: object.username,
                    email: object.email,
                    password: object.password,
                    phone_number: object.phone_number,
                };
                result = validateEditObj(old, req.body);
                if (!(typeof result == "string")) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({
                        error: true,
                        message: result,
                    })];
            case 2: return [4 /*yield*/, User.update(result, {
                    where: { id: id_user },
                })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, User.findByPk(id_user)];
            case 5:
                after = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "User Updated Successfully",
                        old: object,
                        after: after,
                    })];
            case 6:
                _a = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        error: true,
                        message: "An unexpected error ocurred, try again later",
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
module.exports = editById;
