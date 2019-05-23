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
var Messages_1 = require("../../Messages");
var User_1 = require("../../entity/User");
var UserBusiness_1 = require("./UserBusiness");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.saveUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var connection, repository, user, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, 5, 6]);
                                return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getConnection()];
                            case 1:
                                connection = _a.sent();
                                return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                            case 2:
                                repository = _a.sent();
                                user = UserBusiness_1.UserBusiness.createUser(req.body);
                                return [4 /*yield*/, repository.save(user)];
                            case 3:
                                _a.sent();
                                result(Messages_1.Messages.USER_SAVED);
                                return [3 /*break*/, 6];
                            case 4:
                                err_1 = _a.sent();
                                reject(err_1);
                                return [3 /*break*/, 6];
                            case 5:
                                connection.close();
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }).then(function (message) {
                    res.status(200).send({ message: message });
                }).catch(function (err) {
                    console.error(err);
                    res.status(400).send({
                        name: err.name,
                        message: err.message,
                        stack: err.stack
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var connection, repository, find_fields, users, err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, 5, 6]);
                                return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getConnection()];
                            case 1:
                                connection = _a.sent();
                                return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                            case 2:
                                repository = _a.sent();
                                try {
                                    find_fields = UserBusiness_1.UserBusiness.createFindFields(req.query);
                                }
                                catch (_b) { }
                                return [4 /*yield*/, repository.find({ where: find_fields })];
                            case 3:
                                users = _a.sent();
                                result(users);
                                return [3 /*break*/, 6];
                            case 4:
                                err_2 = _a.sent();
                                reject(err_2);
                                return [3 /*break*/, 6];
                            case 5:
                                connection.close();
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }).then(function (users) {
                    res.status(200).send({ data: users });
                }).catch(function (err) {
                    console.error(err);
                    res.status(400).send({
                        name: err.name,
                        message: err.message,
                        stack: err.stack
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var connection, repository, find_fields, user, err_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, 5, 6]);
                                return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getConnection()];
                            case 1:
                                connection = _a.sent();
                                return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                            case 2:
                                repository = _a.sent();
                                find_fields = UserBusiness_1.UserBusiness.createFindFields(req.query);
                                user = UserBusiness_1.UserBusiness.createUser(req.body);
                                return [4 /*yield*/, repository.update(find_fields, user)];
                            case 3:
                                _a.sent();
                                result(Messages_1.Messages.USER_UPDATED);
                                return [3 /*break*/, 6];
                            case 4:
                                err_3 = _a.sent();
                                reject(err_3);
                                return [3 /*break*/, 6];
                            case 5:
                                connection.close();
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }).then(function (message) {
                    res.status(200).send({ message: message });
                }).catch(function (err) {
                    console.error(err);
                    res.status(400).send({
                        name: err.name,
                        message: err.message,
                        stack: err.stack
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var connection, repository, find_fields, err_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, 5, 6]);
                                return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getConnection()];
                            case 1:
                                connection = _a.sent();
                                return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                            case 2:
                                repository = _a.sent();
                                find_fields = UserBusiness_1.UserBusiness.createFindFields(req.query);
                                console.log(find_fields);
                                return [4 /*yield*/, repository.delete(find_fields)];
                            case 3:
                                _a.sent();
                                result(Messages_1.Messages.USER_DELETED);
                                return [3 /*break*/, 6];
                            case 4:
                                err_4 = _a.sent();
                                reject(err_4);
                                return [3 /*break*/, 6];
                            case 5:
                                connection.close();
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }).then(function (message) {
                    res.status(200).send({ message: message });
                }).catch(function (err) {
                    console.error(err);
                    res.status(400).send({
                        name: err.name,
                        message: err.message,
                        stack: err.stack
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map