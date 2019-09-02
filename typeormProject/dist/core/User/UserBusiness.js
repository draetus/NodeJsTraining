"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
    }
    UserBusiness.convertToObject = function (data) {
        var user = {};
        if (data.id) {
            user.id = parseInt(data.id);
        }
        if (data.login) {
            user.login = data.login;
        }
        if (data.password) {
            user.password = data.password;
        }
        if (data.name) {
            user.name = data.name;
        }
        if (data.age) {
            user.age = parseInt(data.age);
        }
        if (data.isHuman) {
            user.isHuman = parseInt(data.isHuman) == 1;
        }
        if (data.balance) {
            user.balance = parseFloat(data.balance);
        }
        return user;
    };
    return UserBusiness;
}());
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map