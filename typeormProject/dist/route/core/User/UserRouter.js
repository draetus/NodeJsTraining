"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../../../core/User/UserController");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.init = function (express) {
        // Body {
        // 	name: string
        // 	age: number
        // 	phone: number
        // 	sex: string
        // 	isHuman: boolean }
        express.post("/api/user", function (req, res, next) {
            UserController_1.UserController.saveUser(req, res);
        });
        // Opcionais (?exemplo="Nome") {
        // 	id: number
        // 	name: string
        // 	age: number
        // 	phone: number
        // 	sex: string
        // 	isHuman: boolean }
        // 
        // Body {
        // 	name: string
        // 	age: number
        // 	phone: number
        // 	sex: string
        // 	isHuman: boolean }
        express.put("/api/user", function (req, res, next) {
            UserController_1.UserController.updateUser(req, res);
        });
        // Opcionais (?exemplo="Nome") {
        // 	id: number
        // 	name: string
        // 	age: number
        // 	phone: number
        // 	sex: string
        // 	isHuman: boolean }
        express.get("/api/user", function (req, res, next) {
            UserController_1.UserController.getUser(req, res);
        });
        // Opcionais (?exemplo="Nome") {
        // 	id: number
        // 	name: string
        // 	age: number
        // 	phone: number
        // 	sex: string
        // 	isHuman: boolean }
        express.delete("/api/user", function (req, res, next) {
            UserController_1.UserController.deleteUser(req, res);
        });
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map