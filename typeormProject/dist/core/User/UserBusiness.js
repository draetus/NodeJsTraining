"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../entity/User");
var UserValidator_1 = require("./UserValidator");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
    }
    UserBusiness.createUser = function (data) {
        UserValidator_1.UserValidator.validateCreateUser(data);
        var user = new User_1.User();
        user.id = data.id;
        user.name = data.name;
        user.age = data.age;
        user.phone = data.phone;
        user.sex = data.sex;
        user.isHuman = data.isHuman;
        return user;
    };
    UserBusiness.createFindFields = function (data) {
        UserValidator_1.UserValidator.validateFindField(data);
        var find_fields = {};
        if (data.id) {
            find_fields.id = data.id;
        }
        if (data.name) {
            find_fields.name = data.name;
        }
        if (data.age) {
            find_fields.age = data.age;
        }
        if (data.phone) {
            find_fields.phone = data.phone;
        }
        if (data.sex) {
            find_fields.sex = data.sex;
        }
        if (data.isHuman) {
            find_fields.isHuman = data.isHuman;
        }
        return find_fields;
    };
    return UserBusiness;
}());
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map