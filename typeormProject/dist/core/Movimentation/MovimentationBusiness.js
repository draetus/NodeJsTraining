"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovimentationBusiness = /** @class */ (function () {
    function MovimentationBusiness() {
    }
    MovimentationBusiness.convertToObject = function (data) {
        var movimentation = {};
        if (data.id) {
            movimentation.id = parseInt(data.id);
        }
        ;
        if (data.idProduct) {
            movimentation.idProduct = parseInt(data.idProduct);
        }
        ;
        if (data.idLoggedUser) {
            movimentation.idUser = parseInt(data.idLoggedUser);
        }
        ;
        if (data.date) {
            movimentation.date = new Date(data.date);
        }
        ;
        if (data.price) {
            movimentation.price = parseInt(data.price);
        }
        ;
        if (data.quantity) {
            movimentation.quantity = parseInt(data.quantity);
        }
        ;
        return movimentation;
    };
    return MovimentationBusiness;
}());
exports.MovimentationBusiness = MovimentationBusiness;
//# sourceMappingURL=MovimentationBusiness.js.map