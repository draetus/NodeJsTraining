"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRouter_1 = require("./User/UserRouter");
var ProductRouter_1 = require("./Product/ProductRouter");
var MovimentationRouter_1 = require("./Movimentation/MovimentationRouter");
var PermissionRouter_1 = require("./Permission/PermissionRouter");
var RouterInit = /** @class */ (function () {
    function RouterInit() {
    }
    RouterInit.init = function (express) {
        UserRouter_1.UserRouter.init(express);
        ProductRouter_1.ProductRouter.init(express);
        MovimentationRouter_1.MovimentationRouter.init(express);
        PermissionRouter_1.PermissionRouter.init(express);
    };
    return RouterInit;
}());
exports.RouterInit = RouterInit;
//# sourceMappingURL=RouterInit.js.map