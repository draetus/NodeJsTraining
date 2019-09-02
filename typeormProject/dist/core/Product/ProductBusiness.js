"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductBusiness = /** @class */ (function () {
    function ProductBusiness() {
    }
    ProductBusiness.convertToObject = function (data) {
        var product = {};
        if (data.id) {
            product.id = parseInt(data.id);
        }
        if (data.name) {
            product.name = data.name;
        }
        if (data.price) {
            product.price = parseFloat(data.price);
        }
        if (data.quantity) {
            product.quantity = parseInt(data.quantity);
        }
        return product;
    };
    return ProductBusiness;
}());
exports.ProductBusiness = ProductBusiness;
//# sourceMappingURL=ProductBusiness.js.map