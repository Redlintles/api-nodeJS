"use strict";
function isInRange(str, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 30; }
    if (!str) {
        return false;
    }
    var result = str.length > min ? str.length <= max : false;
    return result;
}
function validateEmail(str) {
    var regex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+/;
    return regex.test(str);
}
function validateUsername(str) {
    var regex = /^[a-zA-Z]+[0-9]*$/;
    return regex.test(str);
}
function validatePassword(str) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    return regex.test(str);
}
function validatePhoneNumber(str) {
    var regex = /^\+\d{1,4}\s\d{2}\s\d{4,5}-\d{4}$/;
    return regex.test(str);
}
module.exports = {
    isInRange: isInRange,
    userValidation: {
        validateUsername: validateUsername,
        validateEmail: validateEmail,
        validatePassword: validatePassword,
        validatePhoneNumber: validatePhoneNumber,
    },
};
