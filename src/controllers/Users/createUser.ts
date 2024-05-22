import { Request, Response } from "express";
const { User, Profile, sequelizeConn } = require("../../utils/models");
const { isInRange, userValidation } = require("../../utils/stringUtils");

const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const obj = {
    username: body.username,
    email: body.email,
    password: body.password,
    phone_number: body.phone_number,
  };

  if (Object.values(obj).includes(undefined)) {
    return res.status(400).json({
      error: true,
      message:
        "Fields Missing(must have username,email,password and phone_number)",
    });
  }
  const lengthCheck = [
    isInRange(obj.username),
    isInRange(obj.email),
    isInRange(obj.password, 0, 20),
    isInRange(obj.phone_number, 0, 19),
  ];

  const {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateUsername,
  } = userValidation;

  if (lengthCheck.includes(false)) {
    return res.status(400).json({
      error: true,
      message:
        "Fields length out of range(max for username is 30, max for email is 30, max for password is 20, max for phone_number is 19",
    });
  }

  if (!validateEmail(obj.email)) {
    return res.status(400).json({
      error: true,
      message: "Email is not valid",
    });
  } else if (!validatePassword(obj.password)) {
    return res.status(400).json({
      error: true,
      message: "Password is too weak",
    });
  } else if (!validateUsername(obj.username)) {
    return res.status(400).json({
      error: true,
      message:
        "Username is not valid(cannot start with numbers but can end with them, and no special symbols",
    });
  } else if (!validatePhoneNumber(obj.phone_number)) {
    return res.status(400).json({
      error: true,
      message: "Phone Number is not valid",
    });
  }
  obj.phone_number = obj.phone_number
    .split("")
    .filter((item: string) => /^\d$/.test(item))
    .join("");

  const transaction = await sequelizeConn.transaction();

  try {
    const user = await User.create(obj);
    const profile = await Profile.create({
      id_user: user.id,
    });

    await transaction.commit();
    return res.status(200).json({
      error: false,
      message: "Usuário Adicionado Com Sucesso",
      user,
      profile,
    });
  } catch {
    await transaction.rollback();
    return res.status(400).json({
      error: true,
      message:
        "A Inserção não pode ser realizada por algum motivo desconhecido",
    });
  }
};

module.exports = createUser;
