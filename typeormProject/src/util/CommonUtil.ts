import * as bunyan from "bunyan";
import * as crypto from "crypto";

import { Constants } from "../Constants";

export class CommonUtil {

	public static dateToString(date: Date): string {
		const tzo: number = - date.getTimezoneOffset();

		return date.getFullYear() +
				"-" + CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) +
				"-" + CommonUtil.numberPadTwoPlaces(date.getDate()) +
				"T" + CommonUtil.numberPadTwoPlaces(date.getHours()) +
				":" + CommonUtil.numberPadTwoPlaces(date.getMinutes()) +
				":" + CommonUtil.numberPadTwoPlaces(date.getSeconds()) +
				(tzo < 0 ? "" : "+") +
				CommonUtil.numberPadTwoPlaces(Math.floor(tzo / 60)) +
				":" + CommonUtil.numberPadTwoPlaces(Math.floor(tzo % 60));
	}

	public static dateToStringWithoutTime(date: Date): string {
		return date.getFullYear() + "-" +
			CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) + "-" +
			CommonUtil.numberPadTwoPlaces(date.getDate());
	}

	public static dateToStringBRWithoutTime(date: Date): string {
		return CommonUtil.numberPadTwoPlaces(date.getDate()) + "/" +
				CommonUtil.numberPadTwoPlaces(date.getMonth() + 1) + "/" +
				date.getFullYear();
	}

	public static dateToStringWithoutTimezone(date: Date): string {
		if (date) {
			return CommonUtil.dateToString(date).slice(0, 19);
		} else {
			return null;
		}
	}

	public static numberPadTwoPlaces(num: number): string {
		if (num < 0) {
			const absNum: number = Math.abs(num);
			return "-" + (absNum < 10 ? "0" : "") + absNum;
		} else {
			return (num < 10 ? "0" : "") + num;
		}
	}

	public static encrypt(text: string): string
	{
		return crypto.createHmac('sha256', Constants.ENCRYPT_SECRET)
                   .update(text)
                   .digest('hex');
	}

}
