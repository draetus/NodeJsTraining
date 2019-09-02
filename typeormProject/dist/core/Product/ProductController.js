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
var Validator_1 = require("../../util/Validator");
var Messages_1 = require("../../Messages");
var Product_1 = require("../../entity/Product");
var ProductValidator_1 = require("./ProductValidator");
var ProductBusiness_1 = require("./ProductBusiness");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.saveProduct = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        req.body = ProductBusiness_1.ProductBusiness.convertToObject(req.body);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, ProductValidator_1.ProductValidator.validateSaveProduct(req, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.save(req.body)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(Messages_1.Messages.PRODUCT_SAVED);
                        return [3 /*break*/, 12];
                    case 7:
                        err_1 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 8:
                        _a.sent();
                        reject(err_1);
                        return [3 /*break*/, 12];
                    case 9:
                        if (!connection) return [3 /*break*/, 11];
                        return [4 /*yield*/, connection.release()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    ProductController.updateProduct = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, 10, 13]);
                        req.params = ProductBusiness_1.ProductBusiness.convertToObject(req.params);
                        req.body = ProductBusiness_1.ProductBusiness.convertToObject(req.body);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, ProductValidator_1.ProductValidator.validateUpdateProduct(req, repository)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, repository.update(req.params, req.body)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 7:
                        _a.sent();
                        result(Messages_1.Messages.PRODUCT_UPDATED);
                        return [3 /*break*/, 13];
                    case 8:
                        err_2 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 9:
                        _a.sent();
                        reject(err_2);
                        return [3 /*break*/, 13];
                    case 10:
                        if (!connection) return [3 /*break*/, 12];
                        return [4 /*yield*/, connection.release()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    ProductController.getProduct = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, products, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, 8, 11]);
                        req.query = ProductBusiness_1.ProductBusiness.convertToObject(req.query);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.find({ where: req.query })];
                    case 4:
                        products = _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 5:
                        _a.sent();
                        result(products);
                        return [3 /*break*/, 11];
                    case 6:
                        err_3 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 7:
                        _a.sent();
                        reject(err_3);
                        return [3 /*break*/, 11];
                    case 8:
                        if (!connection) return [3 /*break*/, 10];
                        return [4 /*yield*/, connection.release()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        }); }).then(function (products) {
            res.status(200).send({ data: products });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    ProductController.getOneProduct = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, product, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        req.params = ProductBusiness_1.ProductBusiness.convertToObject(req.params);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.findOne({ where: req.params })];
                    case 5:
                        product = _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(product);
                        return [3 /*break*/, 12];
                    case 7:
                        err_4 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 8:
                        _a.sent();
                        reject(err_4);
                        return [3 /*break*/, 12];
                    case 9:
                        if (!connection) return [3 /*break*/, 11];
                        return [4 /*yield*/, connection.release()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        }); }).then(function (product) {
            res.status(200).send({ data: product });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    ProductController.deleteProduct = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        req.params = ProductBusiness_1.ProductBusiness.convertToObject(req.params);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Product_1.Product)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.delete(req.params)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(Messages_1.Messages.PRODUCT_DELETED);
                        return [3 /*break*/, 12];
                    case 7:
                        err_5 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 8:
                        _a.sent();
                        reject(err_5);
                        return [3 /*break*/, 12];
                    case 9:
                        if (!connection) return [3 /*break*/, 11];
                        return [4 /*yield*/, connection.release()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map