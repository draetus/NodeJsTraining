"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator_1 = require("./UserValidator");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
    }
    UserBusiness.createFields = function (data) {
        UserValidator_1.UserValidator.validateFields(data);
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