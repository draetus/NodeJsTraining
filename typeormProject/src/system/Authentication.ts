import { Application, NextFunction, Request, Response } from "express";

import { QueryRunner } from "typeorm";
import { Repository } from "typeorm";

import { CustomError } from "./CustomError";

import { ConnectionUtil } from "../util/ConnectionUtil";
import { ResponseUtil } from "../util/ResponseUtil";
import { TokenUtil } from "../util/TokenUtil";

import { Messages } from "../Messages";

import { User } from "../entity/User";

export class Authentication {

	private static authenticate(req: Request, res: Response, next: NextFunction, permission: string): void	{
		new Promise<string>(async (result, reject) => {
			try {
				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repository: Repository<User> = await connection.manager.getRepository(User);

				if (!req.headers.authorization || req.headers.authorization.split(" ").length < 2)
				{ throw new CustomError(400, Messages.ERROR_INVALID_AUTHORIZATION_REQUEST) }

				var sub: any = await TokenUtil.validate(repository, req.headers.authorization.split(" ")[1]);
				
				var user: User = await repository.findOne({id: sub.id});
				req.body.idLoggedUser = user.id;

				if (!sub.permissions || sub.permissions.indexOf(permission) == -1)
				{ throw new CustomError(401, Messages.ERROR_PERMISSION_DENIED); }

				await connection.commitTransaction();
				result(Messages.AUTHENTICATED);
			} catch (err) {
				await connection.rollbackTransaction();
				reject(err);
			} finally {
				if (connection)
					await connection.release();
			}
		}).then((message: string) => {
			// console.log(message);
			next();
		}).catch((err: CustomError): void => {
			ResponseUtil.responseError(err, res);
		});
	}

	public static authenticateUser(req: Request, res: Response, next: NextFunction): void {
		Authentication.authenticate(req, res, next, "user");
	}

	public static authenticateAdmin(req: Request, res: Response, next: NextFunction): void {
		Authentication.authenticate(req, res, next, "admin");
	}

	public static authenticateModerator(req: Request, res: Response, next: NextFunction): void {
		Authentication.authenticate(req, res, next, "moderator");
	}

}