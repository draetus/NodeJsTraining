import { Request } from "express";
import { Repository } from "typeorm";

import { CustomError } from "../../system/CustomError";

import { Messages } from "../../Messages";

import { Validator } from "../../util/Validator";

import { Movimentation } from "../../entity/Movimentation";
import { Product } from "../../entity/Product";

export class MovimentationValidator {

	public static async validateMovimentation(req: Request, repositoryProduct: Repository<Product>, type: string): Promise<any>
	{
		if (!req.body.idUser){throw new CustomError(400, Messages.ERROR_USER_NOT_PROVIDED);}
		if (!req.body.idProduct){throw new CustomError(400, Messages.ERROR_PRODUCT_NOT_PROVIDED);}

		var find_product: object = {
			id: req.body.idProduct
		}
		
		await Validator.validateIfExistsInDatabase(find_product, repositoryProduct);
		var product: Product = await repositoryProduct.findOne(find_product);

		if (product.quantity < 1)
		{
			throw new CustomError(400, Messages.ERROR_OUT_OF_STOCK);
		}

		if (req.body.quantity){
			if (req.body.quantity < 1 || type == "buy" && req.body.quantity > product.quantity)
			{
				throw new CustomError(400, Messages.ERROR_QUANTITY_INVALID);	
			}
		}
	}
	
}