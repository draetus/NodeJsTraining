import { Response } from "express";

import { CustomError } from "../system/CustomError";

export class ResponseUtil {

	public static responseError(err: CustomError, res: Response): void
	{
		console.log(err);
		var error: any = err.getResponse();
		res.status(err.status).send({
				name: error.name,
			    message: error.message,
			    stack: error.stack
		});
	}

}