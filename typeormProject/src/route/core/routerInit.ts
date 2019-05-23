import * as express from "express";

import { UserRouter } from "./User/UserRouter";

export class RouterInit {

	public static init(express: express.Application){
		UserRouter.init(express);
	}

}