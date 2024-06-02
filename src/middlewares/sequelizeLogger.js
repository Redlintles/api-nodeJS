"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelizeErrorLogger = require("../utils/logger").sequelizeErrorLogger;
var sequelizeLogger = function (req, res) {
    if (req.body.error) {
        var _a = req.body.error, message = _a.message, stack = _a.stack;
        sequelizeErrorLogger.error({
            message: message,
            stack: stack,
        });
        return res.status(500).json({
            error: true,
            message: "An unexpected error ocurred, try again later",
        });
    }
    else {
        return res.status(500).json({
            error: true,
            message: "END OF LINE",
        });
    }
};
module.exports = sequelizeLogger;
