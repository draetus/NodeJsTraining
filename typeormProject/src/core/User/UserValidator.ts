import { Request } from "express";
import { Repository } from "typeorm";

import { User } from "../../entity/User";

import { CustomError } from "../../system/CustomError";

import { Validator } from "../../util/Validator";
import { CommonUtil } from "../../util/CommonUtil";

import { Messages } from "../../Messages";

export class UserValidator {

	public static async validateSaveUser(req: Request, repository: Repository<User>): Promise<void>
	{
		if (!req.body.login){ throw new CustomError(400, Messages.ERROR_LOGIN_NOT_PROVIDED); }
		if (!req.body.password){ throw new CustomError(400, Messages.ERROR_PASSWORD_NOT_PROVIDED); }
		if (!req.body.name){ throw new CustomError(400, Messages.ERROR_NAME_NOT_PROVIDED); }

		var find_fields: object = {
			login: req.body.login,
		};

		await Validator.validateIfNotExistsInDatabase(find_fields, repository);
	}

	public static async validateUpdateUser(req: Request, repository: Repository<User>): Promise<void> 
	{
		await Validator.validateIfExistsInDatabase(req.params, repository);

		if (req.body.login)
		{
			var find_fields: object = {
				login: req.body.login
			};
			await Validator.validateIfNotExistsInDatabase(find_fields, repository);
			return;
		}
		if (req.body.password){return;}
		if (req.body.name){return;}
		if (req.body.age){return;}
		if (req.body.isHuman){return;}
		if (req.body.balance){return;}

		throw new CustomError(400, Messages.ERROR_NO_FIELD);
	}

	public static async validateLogin(req: Request, repository: Repository<User>): Promise<void>
	{
		if (!req.body.login){ throw new CustomError(400, Messages.ERROR_LOGIN_NOT_PROVIDED); }
		if (!req.body.password){ throw new CustomError(400, Messages.ERROR_PASSWORD_NOT_PROVIDED); }

		req.body.password = CommonUtil.encrypt(req.body.password);

		var find_fields: object = {
			login: req.body.login,
			password: req.body.password
		}

		await Validator.validateIfExistsInDatabase(find_fields, repository);
	}

}