"use strict";
var _a = require("winston"), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
var combine = format.combine, timestamp = format.timestamp, printf = format.printf;
var requestLogger = createLogger({
    format: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), printf(function (_a) {
        var timestamp = _a.timestamp, level = _a.level, message = _a.message;
        return "".concat(timestamp, " ").concat(level, " ").concat(message);
    })),
    transports: [new transports.File({ filename: "logs/requests.log" })],
});
module.exports = {
    requestLogger: requestLogger,
};
