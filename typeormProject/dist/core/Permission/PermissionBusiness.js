"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PermissionBusiness = /** @class */ (function () {
    function PermissionBusiness() {
    }
    PermissionBusiness.convertToObject = function (data) {
        var permission = {};
        if (data.id) {
            permission.id = parseInt(data.id);
        }
        if (data.idUser) {
            permission.idUser = parseInt(data.idUser);
        }
        if (data.name) {
            permission.name = data.name;
        }
        return permission;
    };
    return PermissionBusiness;
}());
exports.PermissionBusiness = PermissionBusiness;
//# sourceMappingURL=PermissionBusiness.js.map