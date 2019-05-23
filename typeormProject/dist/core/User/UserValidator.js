"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages_1 = require("../../Messages");
var UserValidator = /** @class */ (function () {
    function UserValidator() {
    }
    UserValidator.validateFindField = function (data) {
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
        throw new Error(Messages_1.Messages.ERROR_NO_FIND_FIELD);
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
        throw new Error(Messages_1.Messages.ERROR_NO_USER_DATA);
    };
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=UserValidator.js.map