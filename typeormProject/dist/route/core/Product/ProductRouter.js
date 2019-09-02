"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductController_1 = require("../../../core/Product/ProductController");
var ProductRouter = /** @class */ (function () {
    function ProductRouter() {
    }
    ProductRouter.init = function (express) {
        // Body {
        // 	name: string
        // 	price: number 
        // 	quantity: number  - Opcional
        // }
        express.post("/api/products", function (req, res, next) {
            ProductController_1.ProductController.saveProduct(req, res);
        });
        // Body {
        // 	name: string
        // 	price: number 
        // 	quantity: number  - Opcional
        // }
        // Params {
        // 	id: number
        // }
        express.put("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.updateProduct(req, res);
        });
        // Opcionais {
        //  id: number
        // 	name: string
        // 	price: number 
        // 	quantity: number  - Opcional
        // }
        express.get("/api/products", function (req, res, next) {
            ProductController_1.ProductController.getProduct(req, res);
        });
        // Params {
        // 	id: number
        // }
        express.get("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.getOneProduct(req, res);
        });
        // Params {
        // 	id: number
        // }
        express.delete("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.deleteProduct(req, res);
        });
    };
    return ProductRouter;
}());
exports.ProductRouter = ProductRouter;
//# sourceMappingURL=ProductRouter.js.map