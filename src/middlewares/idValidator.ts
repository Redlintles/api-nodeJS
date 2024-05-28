import { Request, Response, NextFunction } from "express";

interface field {
  fieldStr: string;
  fieldObj: any;
}

const validateId = require("../utils/validateId");

function idValidator(
  fields: Array<field>,
  equal: boolean = false,
  queryParams = false
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const arr = [];

    for (let field of fields) {
      const { fieldStr, fieldObj } = field;
      const value = queryParams ? req.query[fieldStr] : req.body[fieldStr];
      const isValid = validateId(value);

      if (typeof isValid === "string") {
        return res.status(400).json({
          error: true,
          message: isValid,
        });
      }

      const exists = await fieldObj.findByPk(value);

      if (!exists) {
        return res.status(400).json({
          error: true,
          message: `Nenhum registro com o id ${value} fora encontrado em ${
            fieldObj.tableName as string
          }`,
        });
      }
      if (equal) {
        arr.push([value, fieldObj]);
      }
    }
    if (equal) {
      const toCompare = arr.map((item) => JSON.stringify(item));
      const set = new Set(toCompare);

      if (toCompare.length !== set.size) {
        return res.status(400).json({
          error: true,
          message: "Os ids não podem ser iguais",
        });
      }
    } else {
      return next();
    }
  };
}

module.exports = idValidator;
