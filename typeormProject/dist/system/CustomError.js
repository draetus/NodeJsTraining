"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(status, message, extra) {
        var _this = _super.call(this, message) || this;
        _this.status = null;
        _this.extra = null;
        //Configura o prototipo explicitamente
        Object.setPrototypeOf(_this, CustomError.prototype);
        _this.status = status;
        if (extra instanceof Error) {
            _this.stack = extra.stack;
        }
        else {
            _this.extra = extra;
        }
        return _this;
    }
    CustomError.prototype.getResponse = function () {
        var response = {
            "message": this.message,
            //"extra": this.extra,
            "stack": null
        };
        if (Config_1.Config.DEBUG) {
            response.stack = this.stack;
        }
        return response;
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map