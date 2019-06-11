import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import { Repository } from "typeorm";

import { ConnectionUtil } from "../../util/ConnectionUtil";
import { ResponseUtil } from "../../util/ResponseUtil";

import { Messages } from  "../../Messages";

import { CustomError } from "../../system/CustomError";

import { Product } from "../../entity/Product";

import { Movimentation } from "../../entity/Movimentation";
import { MovimentationBusiness } from "./MovimentationBusiness";
import { MovimentationValidator } from "./MovimentationValidator";

export class MovimentationController {

	public static saveMovimentation(req: Request, res: Response, type: string): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = MovimentationBusiness.convertToObject(req.body);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repositoryMov: Repository<Movimentation> = await connection.manager.getRepository(Movimentation);
				var repositoryProd: Repository<Product> = await connection.manager.getRepository(Product);

				await MovimentationValidator.validateMovimentation(req, repositoryProd, type);

				var movimentation = new Movimentation();
				movimentation.idUser = req.body.idUser;
				movimentation.idProduct = req.body.idProduct;
				movimentation.date = new Date();
				movimentation.quantity = req.body.quantity ? req.body.quantity : 1;
				movimentation.price = (await repositoryProd.findOne(req.body.idProduct)).price;
				movimentation.type = type;

				var find_product: object = { id: req.body.idProduct };
				var product: Product = await repositoryProd.findOne(find_product);

				var new_quantity: number = type == "buy" ? product.quantity - movimentation.quantity : product.quantity + movimentation.quantity;
				var update_product: object = { quantity: new_quantity };

				await repositoryProd.update(find_product, update_product);
				await repositoryMov.save(movimentation);
				
				await connection.commitTransaction();
				result(Messages.MOVIMENTATION_SAVED);
			} catch (err) {
				await connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					await connection.release();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}
	
}