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

import { Permission } from "../../entity/Permission";

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
				var repositoryUser: Repository<User> = await connection.manager.getRepository(User);
				var repositoryPermission: Repository<Permission> = await connection.manager.getRepository(Permission);

				await UserValidator.validateSaveUser(req, repositoryUser);

				req.body.password = CommonUtil.encrypt(req.body.password);

				await repositoryUser.save(req.body);

				var permission: Permission = new Permission();
				permission.idUser = (await repositoryUser.findOneOrFail(req.body)).id;
				permission.name = "user";
				await repositoryPermission.save(permission);

				await connection.commitTransaction();
				result(Messages.USER_SAVED);
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


	public static getUser(req: Request, res: Response): void {

		new Promise<Array<User>>(async (result, reject) => {
			try {
				req.query = UserBusiness.convertToObject(req.query);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				var users: Array<User> = await repository.find({where: req.query});

				await connection.commitTransaction();
				result(users);
			} catch (err) {
				await connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					await connection.release();
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

				var user: User = await repository.findOneOrFail({where: req.params});

				await connection.commitTransaction();
				result(user);
			} catch (err) {
				await connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					await connection.release();
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

				await connection.commitTransaction();
				result(Messages.USER_UPDATED);
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

	public static deleteUser(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.params = UserBusiness.convertToObject(req.params);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repositoryUser: Repository<User> = await connection.manager.getRepository(User);
				var repositoryPermission: Repository<Permission> = await connection.manager.getRepository(Permission);

				await Validator.validateIfExistsInDatabase(req.params, repositoryUser);

				await repositoryPermission.delete({idUser: req.params.id});
				await repositoryUser.delete(req.params);

				await connection.commitTransaction();
				result(Messages.USER_DELETED);
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

	public static login(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = UserBusiness.convertToObject(req.body);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repositoryUser: Repository<User> = await connection.manager.getRepository(User);
				var repositoryPermission: Repository<Permission> = await connection.manager.getRepository(Permission);

				await UserValidator.validateLogin(req, repositoryUser);

				var user: User = await repositoryUser.findOneOrFail({where: req.body});
				var permissions: Array<string> = [];
				for (var p of (await repositoryPermission.find({where: {idUser: user.id}})))
				{
					permissions.push(p.name);
				}

				var token: string = TokenUtil.create(user, permissions);

				await connection.commitTransaction();
				result(token);
			} catch (err) {
				await connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					await connection.release();
			}
		}).then((token: string): void => {
			res.status(200).send({token: token});
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}
}