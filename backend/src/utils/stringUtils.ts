function isInRange(str: string, min: number = 0, max: number = 30): boolean {
  if (!str) {
    return false;
  }
  const result = str.length > min ? str.length <= max : false;
  return result;
}

function validateEmail(str: string): boolean {
  const regex =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+/;

  return regex.test(str);
}

function validateUsername(str: string): boolean {
  const regex = /^[a-zA-Z]+[0-9]*$/;
  return regex.test(str);
}

function validatePassword(str: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  return regex.test(str);
}

function validatePhoneNumber(str: string): boolean {
  const regex = /^\d{13}$/;
  return regex.test(str);
}

module.exports = {
  isInRange,
  userValidation: {
    validateUsername,
    validateEmail,
    validatePassword,
    validatePhoneNumber,
  },
};
