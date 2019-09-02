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
var CustomError_1 = require("./CustomError");
var ConnectionUtil_1 = require("../util/ConnectionUtil");
var ResponseUtil_1 = require("../util/ResponseUtil");
var TokenUtil_1 = require("../util/TokenUtil");
var Messages_1 = require("../Messages");
var User_1 = require("../entity/User");
var Authentication = /** @class */ (function () {
    function Authentication() {
    }
    Authentication.authenticate = function (req, res, next, permission) {
        var _this = this;
        new Promise(function (result, reject) { return __awaiter(_this, void 0, void 0, function () {
            var connection, repository, sub, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 9, 12]);
                        return [4 /*yield*/, ConnectionUtil_1.ConnectionUtil.getQueryRunner()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.getRepository(User_1.User)];
                    case 3:
                        repository = _a.sent();
                        if (!req.headers.authorization || req.headers.authorization.split(" ").length < 2) {
                            throw new CustomError_1.CustomError(400, Messages_1.Messages.ERROR_INVALID_AUTHORIZATION_REQUEST);
                        }
                        return [4 /*yield*/, TokenUtil_1.TokenUtil.validate(repository, req.headers.authorization.split(" ")[1])];
                    case 4:
                        sub = _a.sent();
                        return [4 /*yield*/, repository.findOne({ id: sub.id })];
                    case 5:
                        user = _a.sent();
                        req.body.idLoggedUser = user.id;
                        if (!sub.permissions || sub.permissions.indexOf(permission) == -1) {
                            throw new CustomError_1.CustomError(401, Messages_1.Messages.ERROR_PERMISSION_DENIED);
                        }
                        return [4 /*yield*/, connection.commitTransaction()];
                    case 6:
                        _a.sent();
                        result(Messages_1.Messages.AUTHENTICATED);
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
            // console.log(message);
            next();
        }).catch(function (err) {
            ResponseUtil_1.ResponseUtil.responseError(err, res);
        });
    };
    Authentication.authenticateUser = function (req, res, next) {
        Authentication.authenticate(req, res, next, "user");
    };
    Authentication.authenticateAdmin = function (req, res, next) {
        Authentication.authenticate(req, res, next, "admin");
    };
    Authentication.authenticateModerator = function (req, res, next) {
        Authentication.authenticate(req, res, next, "moderator");
    };
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map