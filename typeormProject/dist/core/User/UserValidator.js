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
var CustomError_1 = require("../../system/CustomError");
var Validator_1 = require("../../util/Validator");
var CommonUtil_1 = require("../../util/CommonUtil");
var Messages_1 = require("../../Messages");
var UserValidator = /** @class */ (function () {
    function UserValidator() {
    }
    UserValidator.validateSaveUser = function (req, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var find_fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.login) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_LOGIN_NOT_PROVIDED);
                        }
                        if (!req.body.password) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_PASSWORD_NOT_PROVIDED);
                        }
                        if (!req.body.name) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_NAME_NOT_PROVIDED);
                        }
                        find_fields = {
                            login: req.body.login,
                        };
                        return [4 /*yield*/, Validator_1.Validator.validateIfNotExistsInDatabase(find_fields, repository)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserValidator.validateUpdateUser = function (req, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var find_fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(req.params, repository)];
                    case 1:
                        _a.sent();
                        if (!req.body.login) return [3 /*break*/, 3];
                        find_fields = {
                            login: req.body.login
                        };
                        return [4 /*yield*/, Validator_1.Validator.validateIfNotExistsInDatabase(find_fields, repository)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (req.body.password) {
                            return [2 /*return*/];
                        }
                        if (req.body.name) {
                            return [2 /*return*/];
                        }
                        if (req.body.age) {
                            return [2 /*return*/];
                        }
                        if (req.body.isHuman) {
                            return [2 /*return*/];
                        }
                        if (req.body.balance) {
                            return [2 /*return*/];
                        }
                        throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_NO_FIELD);
                }
            });
        });
    };
    UserValidator.validateLogin = function (req, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var find_fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.login) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_LOGIN_NOT_PROVIDED);
                        }
                        if (!req.body.password) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_PASSWORD_NOT_PROVIDED);
                        }
                        req.body.password = CommonUtil_1.CommonUtil.encrypt(req.body.password);
                        find_fields = {
                            login: req.body.login,
                            password: req.body.password
                        };
                        return [4 /*yield*/, Validator_1.Validator.validateIfExistsInDatabase(find_fields, repository)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=UserValidator.js.map