"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = __importStar(require("crypto"));
var Constants_1 = require("../Constants");
var CommonUtil = /** @class */ (function () {
    function CommonUtil() {
    }
    CommonUtil.dateToString = function (date) {
        var tzo = -date.getTimezoneOffset();
        return date.getFullYear() +
            "-" + CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) +
            "-" + CommonUtil.numberPadTwoPlaces(date.getDate()) +
            "T" + CommonUtil.numberPadTwoPlaces(date.getHours()) +
            ":" + CommonUtil.numberPadTwoPlaces(date.getMinutes()) +
            ":" + CommonUtil.numberPadTwoPlaces(date.getSeconds()) +
            (tzo < 0 ? "" : "+") +
            CommonUtil.numberPadTwoPlaces(Math.floor(tzo / 60)) +
            ":" + CommonUtil.numberPadTwoPlaces(Math.floor(tzo % 60));
    };
    CommonUtil.dateToStringWithoutTime = function (date) {
        return date.getFullYear() + "-" +
            CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) + "-" +
            CommonUtil.numberPadTwoPlaces(date.getDate());
    };
    CommonUtil.dateToStringBRWithoutTime = function (date) {
        return CommonUtil.numberPadTwoPlaces(date.getDate()) + "/" +
            CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) + "/" +
            date.getFullYear();
    };
    CommonUtil.dateToStringWithoutTimezone = function (date) {
        if (date) {
            return CommonUtil.dateToString(date).slice(0, 19);
        }
        else {
            return null;
        }
    };
    CommonUtil.numberPadTwoPlaces = function (num) {
        if (num < 0) {
            var absNum = Math.abs(num);
            return "-" + (absNum < 10 ? "0" : "") + absNum;
        }
        else {
            return (num < 10 ? "0" : "") + num;
        }
    };
    CommonUtil.encrypt = function (text) {
        return crypto.createHmac('sha256', Constants_1.Constants.ENCRYPT_SECRET)
            .update(text)
            .digest('hex');
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;
//# sourceMappingURL=CommonUtil.js.map