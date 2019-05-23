import { Request, Response } from "express";

import { ConnectionUtil } from "../../util/ConnectionUtil";
import { Connection } from "typeorm";

import { Messages } from  "../../Messages";

import { User } from "../../entity/User";
import { UserBusiness } from "./UserBusiness";
import { UserValidator } from "./UserValidator";

export class UserController {

	public static async saveUser(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository = await connection.manager.getRepository(User);

				var create_fields: any = UserBusiness.createFields(req.body);

				await repository.save(create_fields);

				result(Messages.USER_SAVED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: Error): void => {
			console.error(err);
			res.status(400).send({
				name: err.name,
			    message: err.message,
			    stack: err.stack
			});
		});
	}


	public static async getUser(req: Request, res: Response){

		new Promise<Array<User>>(async (result, reject) => {
			try {

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository = await connection.manager.getRepository(User);

				try {
					var find_fields: any = UserBusiness.createFields(req.query);
				} catch {}

				var users: Array<User> = await repository.find({where: find_fields});

				result(users);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((users: Array<User>): void => {
			res.status(200).send({data: users});
		}).catch((err: Error): void => {
			console.error(err);
			res.status(400).send({
				name: err.name,
			    message: err.message,
			    stack: err.stack
			});
		});
	}

	public static async updateUser(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository = await connection.manager.getRepository(User);

				var find_fields: any = UserBusiness.createFields(req.query);
				var update_fields: any = UserBusiness.createFields(req.body);

				await repository.update(find_fields, update_fields);

				result(Messages.USER_UPDATED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: Error): void => {
			console.error(err);
			res.status(400).send({
				name: err.name,
			    message: err.message,
			    stack: err.stack
			});
		});
	}

	public static async deleteUser(req: Request, res: Response){

		new Promise<string>(async (result, reject) => {
			try {

				var connection: Connection = await ConnectionUtil.getConnection();
				var repository = await connection.manager.getRepository(User);

				var find_fields: any = UserBusiness.createFields(req.query);

				await repository.delete(find_fields);

				result(Messages.USER_DELETED);
			} catch (err) {
				reject(err);
			} finally {
				connection.close();
			}
		}).then((message: string): void => {
			res.status(200).send({message: message});
		}).catch((err: Error): void => {
			console.error(err);
			res.status(400).send({
				name: err.name,
			    message: err.message,
			    stack: err.stack
			});
		});
	}
}