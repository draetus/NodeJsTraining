import { Application, NextFunction, Request, Response } from "express";

import { UserRouter } from "./User/UserRouter";
import { ProductRouter } from "./Product/ProductRouter";

export class RouterInit {

	public static init(express: Application){
		UserRouter.init(express);
		ProductRouter.init(express);
	}

}