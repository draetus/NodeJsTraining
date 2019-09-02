"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionUtil_1 = require("../../util/ConnectionUtil");
var ResponseUtil_1 = require("../../util/ResponseUtil");
var Messages_1 = require("../../Messages");
var Product_1 = require("../../entity/Product");
var Movimentation_1 = require("../../entity/Movimentation");
var MovimentationBusiness_1 = require("./MovimentationBusiness");
var MovimentationValidator_1 = require("./MovimentationValidator");
var MovimentationController = /** @class */ (function () {
    function MovimentationController() {
    }
    MovimentationController.saveMovimentation = function (req, res, type) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repositoryMov, repositoryProd, movimentation, _a, find_product, product, new_quantity, update_product, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, 13, 16]);
                        req.body = MovimentationBusiness_1.MovimentationBusiness.convertToObject(req.body);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Movimentation_1.Movimentation)];
                    case 3:
                        repositoryMov = _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 4:
                        repositoryProd = _b.sent();
                        return [4 /*yield*/, MovimentationValidator_1.MovimentationValidator.validateMovimentation(req, repositoryProd, type)];
                    case 5:
                        _b.sent();
                        movimentation = new Movimentation_1.Movimentation();
                        movimentation.idUser = req.body.idUser;
                        movimentation.idProduct = req.body.idProduct;
                        movimentation.date = new Date();
                        movimentation.quantity = req.body.quantity ? req.body.quantity : 1;
                        _a = movimentation;
                        return [4 /*yield*/, repositoryProd.findOne(req.body.idProduct)];
                    case 6:
                        _a.price = (_b.sent()).price;
                        movimentation.type = type;
                        find_product = { id: req.body.idProduct };
                        return [4 /*yield*/, repositoryProd.findOne(find_product)];
                    case 7:
                        product = _b.sent();
                        new_quantity = type == "buy" ? product.quantity - movimentation.quantity : product.quantity + movimentation.quantity;
                        update_product = { quantity: new_quantity };
                        return [4 /*yield*/, repositoryProd.update(find_product, update_product)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, repositoryMov.save(movimentation)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 10:
                        _b.sent();
                        result(Messages_1.Messages.MOVIMENTATION_SAVED);
                        return [3 /*break*/, 16];
                    case 11:
                        err_1 = _b.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 12:
                        _b.sent();
                        reject(err_1);
                        return [3 /*break*/, 16];
                    case 13:
                        if (!connection) return [3 /*break*/, 15];
                        return [4 /*yield*/, connection.release()];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    return MovimentationController;
}());
exports.MovimentationController = MovimentationController;
//# sourceMappingURL=MovimentationController.js.map