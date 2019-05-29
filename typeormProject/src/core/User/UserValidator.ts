import { Request } from "express";
import { Repository } from "typeorm";

import { User } from "../../entity/User";

import { CustomError } from "../../system/CustomError";

import { Validator } from "../../util/Validator";
import { CommonUtil } from "../../util/CommonUtil";

import { Messages } from "../../Messages";

export class UserValidator {

	public static async validateSaveUser(req: Request, data: object, repository: Repository<User>): Promise<void>
	{
		if (!req.body.login){ throw new CustomError(400, Messages.ERROR_LOGIN_NOT_PROVIDED); }
		if (!req.body.password){ throw new CustomError(400, Messages.ERROR_PASSWORD_NOT_PROVIDED); }
		if (!req.body.name){ throw new CustomError(400, Messages.ERROR_NAME_NOT_PROVIDED); }

		await Validator.validateIfExistsInDatabase(data, repository);
	}

	public static async validateUpdateUser(req: Request, data: object, repository: Repository<User>): Promise<void> 
	{
		await Validator.validateIfNotExistsInDatabase(data, repository);

		if (req.body.login){return;}
		if (req.body.password){return;}
		if (req.body.name){return;}
		if (req.body.age){return;}
		if (req.body.isHuman){return;}
		if (req.body.balance){return;}

		throw new CustomError(400, Messages.ERROR_NO_FIELD);
	}

	public static async validateLogin(req: Request, data: object, repository: Repository<User>): Promise<void>
	{
		if (!req.body.login){ throw new CustomError(400, Messages.ERROR_LOGIN_NOT_PROVIDED); }
		if (!req.body.password){ throw new CustomError(400, Messages.ERROR_PASSWORD_NOT_PROVIDED); }

		data["password"] = CommonUtil.encrypt(data["password"]);

		await Validator.validateIfNotExistsInDatabase(data, repository);
	}

}