"use strict";
var userValidation = require("./stringUtils").userValidation;
function filterEditObj(original, editObj) {
    var validateUsername = userValidation.validateUsername, validateEmail = userValidation.validateEmail, validatePassword = userValidation.validatePassword, validatePhoneNumber = userValidation.validatePhoneNumber;
    var resultObj = Object.assign(original, editObj);
    if (!validateUsername(resultObj.username)) {
        return "Invalid Username";
    }
    else if (!validateEmail(resultObj.email)) {
        return "Invalid Email";
    }
    else if (!validatePassword(resultObj.password)) {
        return "Invalid Password";
    }
    else if (!validatePhoneNumber(resultObj.phone_number)) {
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
