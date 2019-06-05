import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
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

	public static saveUser(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateSaveUser(req, repository);

				req.body.password = CommonUtil.encrypt(req.body.password);

				await repository.save(req.body);

				connection.commitTransaction();
				result(Messages.USER_SAVED);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}


	public static getUser(req: Request, res: Response): void {

		new Promise<Array<User>>(async (result, reject) => {
			try {
				req.query = UserBusiness.convertToObject(req.query);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				var users: Array<User> = await repository.find({where: req.query});

				connection.commitTransaction();
				result(users);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((users: Array<User>): void => {
			res.status(200).send({data: users});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}


	public static getOneUser(req: Request, res: Response): void {

		new Promise<User>(async (result, reject) => {
			try {
				req.params = UserBusiness.convertToObject(req.params);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				var user: User = await repository.findOne({where: req.params});

				connection.commitTransaction();
				result(user);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((user: User): void => {
			res.status(200).send({data: user});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static updateUser(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);
				req.params = UserBusiness.convertToObject(req.params);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateUpdateUser(req, repository);

				await repository.update(req.params, req.body);

				connection.commitTransaction();
				result(Messages.USER_UPDATED);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static deleteUser(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.params = UserBusiness.convertToObject(req.params);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await Validator.validateIfExistsInDatabase(req.params, repository);

				await repository.delete(req.params);

				connection.commitTransaction();
				result(Messages.USER_DELETED);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static login(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);
				req.body.password = CommonUtil.encrypt(req.body.password);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				await UserValidator.validateLogin(req, repository);

				var user: User = await repository.findOneOrFail({where: req.body});

				var token: string = TokenUtil.create(user);

				connection.commitTransaction();
				result(token);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((token: string): void => {
			res.status(200).send({token: token});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}
}