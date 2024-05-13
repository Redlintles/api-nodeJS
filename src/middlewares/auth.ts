import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers["x-api-key"]);
};

module.exports = auth;
