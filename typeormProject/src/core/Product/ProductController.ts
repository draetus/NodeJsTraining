import { Request, Response } from "express";
import { Connection } from "typeorm";
import { Repository } from "typeorm";

import { ConnectionUtil } from "../../util/ConnectionUtil";
import { ResponseUtil } from "../../util/ResponseUtil";
import { Validator } from "../../util/Validator";

import { Messages } from  "../../Messages";

import { CustomError } from "../../system/CustomError";

import { Product } from "../../entity/Product";
import { ProductValidator } from "./ProductValidator";
import { ProductBusiness } from "./ProductBusiness";

export class ProductController {

	public static async saveProduct(req: Request, res: Response): Promise<void> {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = ProductBusiness.convertToObject(req.body);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<Product> = await connection.manager.getRepository(Product);

				await ProductValidator.validateSaveProduct(req, repository);

				await repository.save(req.body);
				
				result(Messages.PRODUCT_SAVED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static async updateProduct(req: Request, res: Response): Promise<void> {

		new Promise<string>(async (result, reject) => {
			try {
				req.params = ProductBusiness.convertToObject(req.params);
				req.body = ProductBusiness.convertToObject(req.body);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<Product> = await connection.manager.getRepository(Product);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				await ProductValidator.validateUpdateProduct(req, repository);

				await repository.update(req.params, req.body);
				
				result(Messages.PRODUCT_UPDATED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static async getProduct(req: Request, res: Response): Promise<void> {

		new Promise<Array<Product>>(async (result, reject) => {
			try {
				req.query = ProductBusiness.convertToObject(req.query);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<Product> = await connection.manager.getRepository(Product);

				var products: Array<Product> = await repository.find({where: req.query});
				
				result(products);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((products: Array<Product>): void => {
			res.status(200).send({data: products});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static async getOneProduct(req: Request, res: Response): Promise<void> {

		new Promise<Product>(async (result, reject) => {
			try {
				req.params = ProductBusiness.convertToObject(req.params);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<Product> = await connection.manager.getRepository(Product);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				var product: Product = await repository.findOne({where: req.params});
				
				result(product);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((product: Product): void => {
			res.status(200).send({data: product});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static async deleteProduct(req: Request, res: Response): Promise<void> {

		new Promise<string>(async (result, reject) => {
			try {
				req.params = ProductBusiness.convertToObject(req.params);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<Product> = await connection.manager.getRepository(Product);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				await repository.delete(req.params);
				
				result(Messages.PRODUCT_DELETED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}
	
}