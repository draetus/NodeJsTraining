"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError_1 = require("../../system/CustomError");
var Messages_1 = require("../../Messages");
var UserValidator = /** @class */ (function () {
    function UserValidator() {
    }
    UserValidator.validateFields = function (data) {
        if (data.id) {
            return;
        }
        if (data.name) {
            return;
        }
        if (data.age) {
            return;
        }
        if (data.phone) {
            return;
        }
        if (data.sex) {
            return;
        }
        if (data.isHuman) {
            return;
        }
        throw new CustomError_1.CustomError(404, Messages_1.Messages.ERROR_NO_FIELD, new Error);
    };
    UserValidator.validateCreateUser = function (data) {
        if (data.id) {
            return;
        }
        if (data.name) {
            return;
        }
        if (data.age) {
            return;
        }
        if (data.phone) {
            return;
        }
        if (data.sex) {
            return;
        }
        if (data.isHuman) {
            return;
        }
        throw new CustomError_1.CustomError(405, Messages_1.Messages.ERROR_NO_USER_DATA, new Error);
    };
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=UserValidator.js.map