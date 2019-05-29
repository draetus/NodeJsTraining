import { Request } from "express";
import { Repository } from "typeorm";

import { Messages } from "../Messages";

import { CustomError } from "../system/CustomError";

export class Validator {

	public static async validateIfExistsInDatabase(find_fields: any, repository: Repository<any>): Promise<void>
	{
		if ((await repository.count(find_fields)) < 1)
		{
			throw new CustomError(400, Messages.ERROR_USER_NOT_FOUND, new Error());
		}
	}

	public static async validateIfNotExistsInDatabase(find_fields: any, repository: Repository<any>): Promise<void>
	{
		if ((await repository.count(find_fields)) > 0)
		{
			throw new CustomError(404, Messages.ERROR_USER_ALREADY_EXISTS, new Error());
		}
	}
}