import { Application, NextFunction, Request, Response } from "express";

import { Authentication } from "../../../system/Authentication";

import { PermissionController } from "../../../core/Permission/PermissionController";

export class PermissionRouter {

	public static init (express: Application)
	{
		// Headers: {
		// 	token: string 
		// }
		// Body: {
		// 	idUser: number
		// 	name: string
		// }
		express.post("/api/permissions", Authentication.authenticateAdmin , (req: Request, res: Response, next: NextFunction): void => {
			PermissionController.addPermission(req, res);
		});

		// Headers: {
		// 	token: string 
		// }
		// Opcionais: {
		// 	idUser: number
		// 	name: string
		// }
		express.get("/api/permissions", Authentication.authenticateUser , (req: Request, res: Response, next: NextFunction): void => {
			PermissionController.getPermission(req, res);
		});
	}

}