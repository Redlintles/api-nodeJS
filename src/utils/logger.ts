const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

const requestLogger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    printf(({ timestamp, level, message }: any) => {
      return `${timestamp} ${level} ${message}`;
    })
  ),
  transports: [new transports.File({ filename: "logs/requests.log" })],
});

module.exports = {
  requestLogger,
};
