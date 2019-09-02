"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductController_1 = require("../../../core/Product/ProductController");
var ProductRouter = /** @class */ (function () {
    function ProductRouter() {
    }
    ProductRouter.init = function (express) {
        express.post("/api/products", function (req, res, next) {
            ProductController_1.ProductController.saveProduct(req, res);
        });
        express.put("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.updateProduct(req, res);
        });
        express.get("/api/products", function (req, res, next) {
            ProductController_1.ProductController.getProduct(req, res);
        });
        express.get("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.getOneProduct(req, res);
        });
        express.delete("/api/products/:id", function (req, res, next) {
            ProductController_1.ProductController.deleteProduct(req, res);
        });
    };
    return ProductRouter;
}());
exports.ProductRouter = ProductRouter;
//# sourceMappingURL=ProductRouter.js.map