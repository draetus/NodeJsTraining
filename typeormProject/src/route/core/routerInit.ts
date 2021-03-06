import { Application, NextFunction, Request, Response } from "express";

import { UserRouter } from "./User/UserRouter";
import { ProductRouter } from "./Product/ProductRouter";
import { MovimentationRouter } from "./Movimentation/MovimentationRouter";
import { PermissionRouter } from "./Permission/PermissionRouter";

export class RouterInit {

	public static init(express: Application){
		UserRouter.init(express);
		ProductRouter.init(express);
		MovimentationRouter.init(express);
		PermissionRouter.init(express);
	}

}