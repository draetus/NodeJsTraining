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
var CommonUtil_1 = require("../../util/CommonUtil");
var ConnectionUtil_1 = require("../../util/ConnectionUtil");
var Validator_1 = require("../../util/Validator");
var TokenUtil_1 = require("../../util/TokenUtil");
var ResponseUtil_1 = require("../../util/ResponseUtil");
var Messages_1 = require("../../Messages");
var Permission_1 = require("../../entity/Permission");
var User_1 = require("../../entity/User");
var UserBusiness_1 = require("./UserBusiness");
var UserValidator_1 = require("./UserValidator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.saveUser = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repositoryUser, repositoryPermission, permission, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, 12, 15]);
                        req.body = UserBusiness_1.UserBusiness.convertToObject(req.body);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repositoryUser = _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Permission_1.Permission)];
                    case 4:
                        repositoryPermission = _b.sent();
                        return [4 /*yield*/, UserValidator_1.UserValidator.validateSaveUser(req, repositoryUser)];
                    case 5:
                        _b.sent();
                        req.body.password = CommonUtil_1.CommonUtil.encrypt(req.body.password);
                        return [4 /*yield*/, repositoryUser.save(req.body)];
                    case 6:
                        _b.sent();
                        permission = new Permission_1.Permission();
                        _a = permission;
                        return [4 /*yield*/, repositoryUser.findOneOrFail(req.body)];
                    case 7:
                        _a.idUser = (_b.sent()).id;
                        permission.name = "user";
                        return [4 /*yield*/, repositoryPermission.save(permission)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 9:
                        _b.sent();
                        result(Messages_1.Messages.USER_SAVED);
                        return [3 /*break*/, 15];
                    case 10:
                        err_1 = _b.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 11:
                        _b.sent();
                        reject(err_1);
                        return [3 /*break*/, 15];
                    case 12:
                        if (!connection) return [3 /*break*/, 14];
                        return [4 /*yield*/, connection.release()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    UserController.getUser = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, 8, 11]);
                        req.query = UserBusiness_1.UserBusiness.convertToObject(req.query);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.find({ where: req.query })];
                    case 4:
                        users = _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 5:
                        _a.sent();
                        result(users);
                        return [3 /*break*/, 11];
                    case 6:
                        err_2 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 7:
                        _a.sent();
                        reject(err_2);
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
        }); }).then(function (users) {
            res.status(200).send({ data: users });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    UserController.getOneUser = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        req.params = UserBusiness_1.UserBusiness.convertToObject(req.params);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.findOneOrFail({ where: req.params })];
                    case 5:
                        user = _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(user);
                        return [3 /*break*/, 12];
                    case 7:
                        err_3 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 8:
                        _a.sent();
                        reject(err_3);
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
        }); }).then(function (user) {
            res.status(200).send({ data: user });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    UserController.updateUser = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        req.body = UserBusiness_1.UserBusiness.convertToObject(req.body);
                        req.params = UserBusiness_1.UserBusiness.convertToObject(req.params);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repository = _a.sent();
                        return [4 /*yield*/, UserValidator_1.UserValidator.validateUpdateUser(req, repository)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.update(req.params, req.body)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(Messages_1.Messages.USER_UPDATED);
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
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    UserController.deleteUser = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repositoryUser, repositoryPermission, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 11, 14]);
                        req.params = UserBusiness_1.UserBusiness.convertToObject(req.params);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repositoryUser = _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Permission_1.Permission)];
                    case 4:
                        repositoryPermission = _a.sent();
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repositoryUser)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, repositoryPermission.delete({ idUser: req.params.id })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, repositoryUser.delete(req.params)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 8:
                        _a.sent();
                        result(Messages_1.Messages.USER_DELETED);
                        return [3 /*break*/, 14];
                    case 9:
                        err_5 = _a.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 10:
                        _a.sent();
                        reject(err_5);
                        return [3 /*break*/, 14];
                    case 11:
                        if (!connection) return [3 /*break*/, 13];
                        return [4 /*yield*/, connection.release()];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        }); }).then(function (message) {
            res.status(200).send({ message: message });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    UserController.login = function (req, res) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repositoryUser, repositoryPermission, user, permissions, _i, _a, p, token, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, 14, 17]);
                        req.body = UserBusiness_1.UserBusiness.convertToObject(req.body);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repositoryUser = _b.sent();
                        return [4 /*yield*/, connection.manager.getRepository(Permission_1.Permission)];
                    case 4:
                        repositoryPermission = _b.sent();
                        return [4 /*yield*/, UserValidator_1.UserValidator.validateLogin(req, repositoryUser)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, repositoryUser.findOneOrFail({ where: req.body })];
                    case 6:
                        user = _b.sent();
                        permissions = [];
                        _i = 0;
                        return [4 /*yield*/, repositoryPermission.find({ where: { idUser: user.id } })];
                    case 7:
                        _a = (_b.sent());
                        _b.label = 8;
                    case 8:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        p = _a[_i];
                        permissions.push(p.name);
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 8];
                    case 10:
                        token = TokenUtil_1.TokenUtil.create(user, permissions);
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 11:
                        _b.sent();
                        result(token);
                        return [3 /*break*/, 17];
                    case 12:
                        err_6 = _b.sent();
                        return [4 /*yield*/, connection.rollbackTransaction()];
                    case 13:
                        _b.sent();
                        reject(err_6);
                        return [3 /*break*/, 17];
                    case 14:
                        if (!connection) return [3 /*break*/, 16];
                        return [4 /*yield*/, connection.release()];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        }); }).then(function (token) {
            res.status(200).send({ token: token });
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map