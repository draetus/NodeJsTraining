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
		// 	IdProduct: number
		// 	quantity: number  - Opcional
		// }
		express.post("/api/movimentations/buy", Authentication.authenticateUser, (req: Request, res: Response, next: NextFunction): void => {
			MovimentationController.saveMovimentation(req, res, "buy");
		});

		// Headers {
		// 	token: string
		// }
		// Body {
		// 	IdProduct: number
		// 	quantity: number  - Opcional
		// }
		express.post("/api/movimentations/stock", Authentication.authenticateModerator , (req: Request, res: Response, next: NextFunction): void => {
			MovimentationController.saveMovimentation(req, res, "stock");
		});

	}

}