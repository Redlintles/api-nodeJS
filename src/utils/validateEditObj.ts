const { userValidation } = require("./stringUtils");

interface obj {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

interface editObj extends Partial<obj> {}

function filterEditObj(original: obj, editObj: editObj): string | obj {
  const {
    validateUsername,
    validateEmail,
    validatePassword,
    validatePhoneNumber,
  } = userValidation;
  const resultObj: obj = Object.assign(original, editObj);

  if (!validateUsername(resultObj.username)) {
    return "Invalid Username";
  } else if (!validateEmail(resultObj.email)) {
    return "Invalid Email";
  } else if (!validatePassword(resultObj.password)) {
    return "Invalid Password";
  } else if (!validatePhoneNumber(resultObj.phone_number)) {
    return "Invalid Phone Number";
  }
  return {
    username: resultObj.username,
    email: resultObj.email,
    password: resultObj.password,
    phone_number: resultObj.phone_number,
  };
}

module.exports = filterEditObj;
