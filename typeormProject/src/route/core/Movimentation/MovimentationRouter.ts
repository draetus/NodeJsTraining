import { Application, NextFunction, Request, Response } from "express";

import { Authentication } from "../../../system/Authentication";

import { MovimentationController } from "../../../core/Movimentation/MovimentationController";

export class MovimentationRouter
{
	public static init (express: Application)
	{
		// Headers {
		// 	token: string
		// }
		// Body {
		//  idUser: number
		// 	IdProduct: number
		// 	quantity: number  - Opcional
		// }
		express.post("/api/movimentations", Authentication.authenticateUser , (req: Request, res: Response, next: NextFunction): void => {
			MovimentationController.saveMovimentation(req, res);
			// console.log(req.body);
		});

	}

}