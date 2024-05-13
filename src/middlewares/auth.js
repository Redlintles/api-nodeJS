"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth = function (req, res, next) {
    console.log(req.headers["x-api-key"]);
};
module.exports = auth;
