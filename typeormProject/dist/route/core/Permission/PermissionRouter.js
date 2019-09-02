"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authentication_1 = require("../../../system/Authentication");
var PermissionController_1 = require("../../../core/Permission/PermissionController");
var PermissionRouter = /** @class */ (function () {
    function PermissionRouter() {
    }
    PermissionRouter.init = function (express) {
        // Headers: {
        // 	token: string 
        // }
        // Body: {
        // 	idUser: number
        // 	name: string
        // }
        express.post("/api/permissions", Authentication_1.Authentication.authenticateAdmin, function (req, res, next) {
            PermissionController_1.PermissionController.addPermission(req, res);
        });
        // Headers: {
        // 	token: string 
        // }
        // Opcionais: {
        // 	idUser: number
        // 	name: string
        // }
        express.get("/api/permissions", Authentication_1.Authentication.authenticateUser, function (req, res, next) {
            PermissionController_1.PermissionController.getPermission(req, res);
        });
    };
    return PermissionRouter;
}());
exports.PermissionRouter = PermissionRouter;
//# sourceMappingURL=PermissionRouter.js.map