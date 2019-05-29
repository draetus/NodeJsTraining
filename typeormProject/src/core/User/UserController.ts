import { Request, Response } from "express";
import { Connection } from "typeorm";
import { Repository } from "typeorm";

import { CommonUtil } from "../../util/CommonUtil";
import { ConnectionUtil } from "../../util/ConnectionUtil";
import { Validator } from "../../util/Validator";
import { TokenUtil } from "../../util/TokenUtil";
import { ResponseUtil } from "../../util/ResponseUtil";

import { Messages } from  "../../Messages";

import { CustomError } from "../../system/CustomError";

import { User } from "../../entity/User";
import { UserBusiness } from "./UserBusiness";
import { UserValidator } from "./UserValidator";

export class UserController {

	public static async saveUser(req: Request, res: Response): Promise<void> {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateSaveUser(req, repository);

				req.body.password = CommonUtil.encrypt(req.body.password);

				await repository.save(req.body);

				result(Messages.USER_SAVED);
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


	public static async getUser(req: Request, res: Response){

		new Promise<Array<User>>(async (result, reject) => {
			try {
				req.query = UserBusiness.convertToObject(req.query);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				var users: Array<User> = await repository.find({where: req.query});

				result(users);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((users: Array<User>): void => {
			res.status(200).send({data: users});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}


	public static async getOneUser(req: Request, res: Response){

		new Promise<User>(async (result, reject) => {
			try {
				req.params = UserBusiness.convertToObject(req.params);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				var user: User = await repository.findOne({where: req.params});

				result(user);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((user: User): void => {
			res.status(200).send({data: user});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static async updateUser(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);
				req.params = UserBusiness.convertToObject(req.params);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateUpdateUser(req, repository);

				await repository.update(req.params, req.body);

				result(Messages.USER_UPDATED);
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

	public static async deleteUser(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {
				req.params = UserBusiness.convertToObject(req.params);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await repository.delete(req.params);

				result(Messages.USER_DELETED);
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

	public static async login(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateLogin(req, repository);

				req.body.password = CommonUtil.encrypt(req.body.password);

				var user: User = await repository.findOneOrFail({where: req.body});

				var token: string = TokenUtil.create(user, new Date());

				result(token);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((token: string): void => {
			res.status(200).send({token: token});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}
}