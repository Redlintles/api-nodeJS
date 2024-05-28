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
var _a = require("../../utils/models"), User = _a.User, Group = _a.Group, sequelizeConn = _a.sequelizeConn, UserGroup = _a.UserGroup;
var validateId = require("../../utils/validateId");
var isInRange = require("../../utils/stringUtils").isInRange;
var createGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, admin_id, group_name, group_desc, max_size, groups, transaction, newGroup, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, admin_id = _a.admin_id, group_name = _a.group_name, group_desc = _a.group_desc;
                max_size = process.env.MAX_FILE_SIZE
                    ? parseInt(process.env.MAX_FILE_SIZE)
                    : 500000;
                if (req.file && req.file.size > max_size) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "A imagem é muito grande",
                        })];
                }
                if (!isInRange(group_desc, 0, 30)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Nome do grupo deve ter no máximo 30 caracteres",
                        })];
                }
                if (!isInRange(group_name, 0, 200)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Descrição do grupo deve ter no máximo 200 caracteres",
                        })];
                }
                return [4 /*yield*/, Group.findAll({
                        where: {
                            admin_id: admin_id,
                        },
                        attributes: ["group_name"],
                    })];
            case 1:
                groups = _c.sent();
                if (groups.map(function (g) { return g.group_name; }).includes(group_name)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Você já criou um grupo com este nome",
                        })];
                }
                return [4 /*yield*/, sequelizeConn.transaction()];
            case 2:
                transaction = _c.sent();
                _c.label = 3;
            case 3:
                _c.trys.push([3, 7, , 9]);
                return [4 /*yield*/, Group.create({
                        admin_id: admin_id,
                        group_name: group_name,
                        group_desc: group_desc,
                        group_banner: req.file ? req.file.buffer : undefined,
                    })];
            case 4:
                newGroup = _c.sent();
                return [4 /*yield*/, UserGroup.create({
                        id_group: newGroup.id,
                        id_member: admin_id,
                    })];
            case 5:
                _c.sent();
                return [4 /*yield*/, transaction.commit()];
            case 6:
                _c.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "Grupo criado com sucesso",
                        obj: newGroup,
                    })];
            case 7:
                _b = _c.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 8:
                _c.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
module.exports = createGroup;
