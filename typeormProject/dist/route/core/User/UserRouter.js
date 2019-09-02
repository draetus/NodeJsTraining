"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../../../core/User/UserController");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.init = function (express) {
        // Body {
        // 	login: string
        // 	password: string 
        // 	name: string 
        // 	age: number - Opcional
        // 	isHuman: boolean  - Opcional
        // 	balance: float - Opcional
        // }
        express.post("/api/users", function (req, res, next) {
            UserController_1.UserController.saveUser(req, res);
        });
        // Body {
        // 	login: string
        // 	password: string 
        // 	name: string 
        // 	age: number - Opcional 
        // 	isHuman: boolean - Opcional 
        // 	balance: float - Opcional 
        // }
        // Params {
        // 	id: number 
        // }
        express.put("/api/users/:id", function (req, res, next) {
            UserController_1.UserController.updateUser(req, res);
        });
        // Opcionais {
        // id: number
        // 	login: string 
        // 	password: string 
        // 	name: string 
        // 	age: number 
        // 	isHuman: boolean 
        // 	balance: float 
        // }
        express.get("/api/users", function (req, res, next) {
            UserController_1.UserController.getUser(req, res);
        });
        // Params {
        // 	id: number 
        // }
        express.get("/api/users/:id", function (req, res, next) {
            UserController_1.UserController.getOneUser(req, res);
        });
        // Params {
        // 	id: number
        // }
        express.delete("/api/users/:id", function (req, res, next) {
            UserController_1.UserController.deleteUser(req, res);
        });
        // Body {
        // 	login: string 
        // 	password: string
        // }
        express.post("/api/users/login", function (req, res, next) {
            UserController_1.UserController.login(req, res);
        });
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map