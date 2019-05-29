import { Application, NextFunction, Request, Response } from "express";

import { UserRouter } from "./User/UserRouter";

export class RouterInit {

	public static init(express: Application){
		UserRouter.init(express);
	}

}