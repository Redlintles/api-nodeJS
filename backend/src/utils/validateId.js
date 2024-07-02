"use strict";
function validateId(id) {
    if (!id) {
        return "Id is not defined";
    }
    if (!/^\d+$/.test(id.toString())) {
        return "Id must be a number";
    }
    return parseInt(id);
}
module.exports = validateId;
