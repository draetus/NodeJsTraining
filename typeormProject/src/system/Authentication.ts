import { Application, NextFunction, Request, Response } from "express";

import { QueryRunner } from "typeorm";
import { Repository } from "typeorm";

import { CustomError } from "./CustomError";

import { ConnectionUtil } from "../util/ConnectionUtil";
import { ResponseUtil } from "../util/ResponseUtil";
import { TokenUtil } from "../util/TokenUtil";

import { Messages } from "../Messages";

import { User } from "../entity/User";

export class Authentication{

	public static authenticateUser(req: Request, res: Response, next: NextFunction): void	{
		new Promise<string>(async (result, reject) => {
			try {
				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				if (!req.headers.authorization || req.headers.authorization.split(" ").length < 2)
				{ throw new CustomError(400, Messages.ERROR_INVALID_AUTHORIZATION_REQUEST) }

				var user: User = await TokenUtil.validate(repository, req.headers.authorization.split(" ")[1]);

				req.body.idUser = user.id;

				connection.commitTransaction();
				result(Messages.AUTHENTICATED);
			} catch (err) {
				connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					connection.release();
			}
		}).then((message: string) => {
			console.log(message);
			next();
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

}