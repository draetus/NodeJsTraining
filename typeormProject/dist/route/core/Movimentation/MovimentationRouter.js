"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authentication_1 = require("../../../system/Authentication");
var MovimentationController_1 = require("../../../core/Movimentation/MovimentationController");
var MovimentationRouter = /** @class */ (function () {
    function MovimentationRouter() {
    }
    MovimentationRouter.init = function (express) {
        // Headers {
        // 	token: string
        // }
        // Body {
        // 	IdProduct: number
        // 	quantity: number  - Opcional
        // }
        express.post("/api/movimentations/buy", Authentication_1.Authentication.authenticateUser, function (req, res, next) {
            MovimentationController_1.MovimentationController.saveMovimentation(req, res, "buy");
        });
        // Headers {
        // 	token: string
        // }
        // Body {
        // 	IdProduct: number
        // 	quantity: number  - Opcional
        // }
        express.post("/api/movimentations/stock", Authentication_1.Authentication.authenticateModerator, function (req, res, next) {
            MovimentationController_1.MovimentationController.saveMovimentation(req, res, "stock");
        });
    };
    return MovimentationRouter;
}());
exports.MovimentationRouter = MovimentationRouter;
//# sourceMappingURL=MovimentationRouter.js.map