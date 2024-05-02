import { Request, Response } from "express";
import { DataTypes } from "sequelize";
const userFn = require("../../models/user")
const db = require("../../utils/db")

const createUser = async (req: Request, res: Response) => {
    const User = userFn(db,DataTypes)
    await User.create({
        username: "Banana",
        email: "Banana@gmail.com",
        password: "Bananation",
        phone_number: "5511958923093"
    })
    return res.send("Banana")
};

module.exports = createUser;
