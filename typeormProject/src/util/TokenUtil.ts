import * as jwt from "jsonwebtoken";

import { Repository } from "typeorm";

import { User } from "../entity/User";

import { CommonUtil } from "../util/CommonUtil";

import { CustomError } from "../system/CustomError";

import { Config } from "../Config";
import { Constants } from "../Constants";
import { Messages } from "../Messages";

export class TokenUtil {

	public static create(user: User, dateNow: Date): string {
		const claims: object = {
			"sub": {
				"id": user.id,
				"dateCreated": CommonUtil.dateToString(dateNow)
			}
		};

		if (!Config.JWT.expiresIn) {
			delete Config.JWT.expiresIn;
		}

		const token: string = jwt.sign(claims, Constants.JWT_SECRET, Config.JWT);
		return token;
	}

	public static async validate(repository: Repository<User>, token: string): Promise<User> {
		if (!token) {
			throw new CustomError(401, Messages.ERROR_USER_NOT_LOGGED, null);
		}

		let response: any = null;
		try {
			response = await TokenUtil.verifyToken(token, Constants.JWT_SECRET);
		} catch (err) {
			throw new CustomError(401, Messages.ERROR_USER_NOT_LOGGED, null);
		}

		const user: User = await repository.findOne({where:{id: response.sub.id}});
		if (user && user.id === response.sub.id /* && token === user.token*/) {
			return user;
		} else {
			throw new CustomError(401, Messages.ERROR_USER_NOT_LOGGED, null);
		}
	}

	private static verifyToken(token: string, secret: string): Promise<any> {
		return new Promise<any>((resolve, reject): void => {
			try {
				jwt.verify(token, secret, (err: Error, response: any): void => {
					if (err) { reject(err); return; }

					resolve(response);
				});
			} catch (err) {
				reject(err);
			}
		});
	}
}
