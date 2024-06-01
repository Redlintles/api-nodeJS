"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelizeLogger = function (req, res) {
    if (req.body.error) {
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
