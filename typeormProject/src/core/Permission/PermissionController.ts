import { Request, Response } from "express";
import { QueryRunner } from "typeorm";
import { Repository } from "typeorm";

import { ConnectionUtil } from "../../util/ConnectionUtil";
import { ResponseUtil } from "../../util/ResponseUtil";

import { Messages } from  "../../Messages";

import { CustomError } from "../../system/CustomError";

import { Validator } from "../../util/Validator";

import { Permission } from "../../entity/Permission";
import { PermissionValidator } from "./PermissionValidator";
import { PermissionBusiness } from "./PermissionBusiness";

export class PermissionController {

	public static addPermission(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.body = PermissionBusiness.convertToObject(req.body);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repositoryPermission: Repository<Permission> = await connection.manager.getRepository(Permission);

				await PermissionValidator.validateAddPermission(req, repositoryPermission);

				await repositoryPermission.save(req.body);
				
				await connection.commitTransaction();
				result(Messages.PERMISSION_SAVED);
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

	public static getPermission(req: Request, res: Response): void {

		new Promise<string>(async (result, reject) => {
			try {
				req.query = PermissionBusiness.convertToObject(req.query);

				var connection: QueryRunner = await ConnectionUtil.getQueryRunner();
				await connection.startTransaction();
				var repositoryPermission: Repository<Permission> = await connection.manager.getRepository(Permission);

				await repositoryPermission.find(req.query);
				
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