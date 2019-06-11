import { Request } from "express";
import { Repository } from "typeorm";

import { CustomError } from "../../system/CustomError";

import { Messages } from "../../Messages";

import { Validator } from "../../util/Validator";

import { Permission } from "../../entity/Permission";

export class PermissionValidator {

	public static async validateAddPermission(req: Request, repositoryPermission: Repository<Permission>): Promise<void>
	{
		if (!req.body.idUser){ throw new CustomError(400, Messages.ERROR_USER_NOT_PROVIDED); }
		if (!req.body.name){ throw new CustomError(400, Messages.ERROR_NAME_NOT_PROVIDED); }

		if (req.body.name != "user" && req.body.name != "moderator")
		{ throw new CustomError(400, Messages.ERROR_NAME_INVALID); }

		await Validator.validateIfNotExistsInDatabase(req.body, repositoryPermission);
	}
	
}