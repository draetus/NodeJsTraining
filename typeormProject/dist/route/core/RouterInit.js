"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRouter_1 = require("./User/UserRouter");
var RouterInit = /** @class */ (function () {
    function RouterInit() {
    }
    RouterInit.init = function (express) {
        UserRouter_1.UserRouter.init(express);
    };
    return RouterInit;
}());
exports.RouterInit = RouterInit;
//# sourceMappingURL=RouterInit.js.map