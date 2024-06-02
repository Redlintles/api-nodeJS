import { Request, Response } from "express";
const { sequelizeErrorLogger } = require("../utils/logger");

const sequelizeLogger = (req: Request, res: Response) => {
  if (req.body.error) {
    const { message, stack } = req.body.error;
    sequelizeErrorLogger.error({
      message,
      stack,
    });
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  } else {
    return res.status(500).json({
      error: true,
      message: "END OF LINE",
    });
  }
};

module.exports = sequelizeLogger;
