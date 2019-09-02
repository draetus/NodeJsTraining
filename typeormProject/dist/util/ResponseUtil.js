"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseUtil = /** @class */ (function () {
    function ResponseUtil() {
    }
    ResponseUtil.responseError = function (err, res) {
        console.log(err);
        var error = err.getResponse();
        res.status(err.status).send({
            name: error.name,
            message: error.message,
            stack: error.stack
        });
    };
    return ResponseUtil;
}());
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=ResponseUtil.js.map