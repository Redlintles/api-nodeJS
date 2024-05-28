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
var Comment = require("../../utils/models").Comment;
var validateId = require("../../utils/validateId");
var isInRange = require("../../utils/stringUtils").isInRange;
var createComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_author, id_post, belongs_to, comment, origin_1, register;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_author = _a.id_author, id_post = _a.id_post, belongs_to = _a.belongs_to, comment = _a.comment;
                if (belongs_to) {
                    belongs_to = validateId(belongs_to);
                    if (typeof belongs_to === "string") {
                        return [2 /*return*/, res.status(400).json({
                                error: true,
                                message: belongs_to,
                            })];
                    }
                }
                else {
                    belongs_to = null;
                }
                if (!belongs_to) return [3 /*break*/, 2];
                return [4 /*yield*/, Comment.findByPk(belongs_to)];
            case 1:
                origin_1 = _b.sent();
                if (!origin_1) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Origin comment does not exists",
                        })];
                }
                if (origin_1.belongs_to) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "An answer cannot belong to another answer",
                        })];
                }
                _b.label = 2;
            case 2:
                if (!isInRange(comment, 0, 200)) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "Tamanho máximo para um comentário é de 200 caracteres",
                        })];
                }
                return [4 /*yield*/, Comment.create({
                        id_post: id_post,
                        id_author: id_author,
                        comment: comment,
                        belongs_to: belongs_to,
                    })];
            case 3:
                register = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        error: false,
                        message: "Comment Created Successfully",
                        comment: register,
                    })];
        }
    });
}); };
module.exports = createComment;
