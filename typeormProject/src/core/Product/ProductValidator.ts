import { Request } from "express";
import { Repository } from "typeorm";

import { CustomError } from "../../system/CustomError";

import { Validator } from "../../util/Validator";

import { Messages } from "../../Messages";

import { Product } from "../../entity/Product";

export class ProductValidator {

	public static async validateSaveProduct(req: Request, repository: Repository<Product>): Promise<void>
	{
		if (!req.body.name) { throw new CustomError(400, Messages.ERROR_NAME_NOT_PROVIDED); }
		if (!req.body.price) { throw new CustomError(400, Messages.ERROR_PRICE_NOT_PROVIDED); }

		var find_fields: object = {
			name: req.body.name
		};

		await Validator.validateIfNotExistsInDatabase(find_fields, repository);
	}

	public static async validateUpdateProduct(req: Request, repository: Repository<Product>)
	{
		if (req.body.name) 
		{
			var find_fields: object = {
				name: req.body.name
			};
			await Validator.validateIfNotExistsInDatabase(find_fields, repository);
			return;
		}
		if (req.body.price) { return; }
		if (req.body.quantity) { return; }

		throw new CustomError(400, Messages.ERROR_NO_FIELD);
		  

	}
	
}