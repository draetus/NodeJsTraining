import { Application, NextFunction, Request, Response } from "express";

import { UserController } from "../../../core/User/UserController";

export class UserRouter {

	public static init(express: Application){

		// Body {
		// 	login: string
		// 	password: string 
		// 	name: string 
		// 	age: number - Opcional
		// 	isHuman: boolean  - Opcional
		// 	balance: float - Opcional
		// }
		express.post("/api/users", (req: Request, res: Response, next: NextFunction): void => {
			UserController.saveUser(req, res);
		});

		// Body {
		// 	login: string
		// 	password: string 
		// 	name: string 
		// 	age: number - Opcional 
		// 	isHuman: boolean - Opcional 
		// 	balance: float - Opcional 
		// }
		// Params {
		// 	id: number 
		// }
		express.put("/api/users/:id", (req: Request, res: Response, next: NextFunction): void => {
			UserController.updateUser(req, res);
		});

		// Opcionais {
		// id: number
		// 	login: string 
		// 	password: string 
		// 	name: string 
		// 	age: number 
		// 	isHuman: boolean 
		// 	balance: float 
		// }
		express.get("/api/users", (req: Request, res: Response, next: NextFunction): void => {
			UserController.getUser(req, res);
		});

		// Params {
		// 	id: number 
		// }
		express.get("/api/users/:id", (req: Request, res: Response, next: NextFunction): void => {
			UserController.getOneUser(req, res);
		});

		// Params {
		// 	id: number
		// }
		express.delete("/api/users/:id", (req: Request, res: Response, next: NextFunction): void => {
			UserController.deleteUser(req, res);
		});

		// Body {
		// 	login: string 
		// 	password: string
		// }
		express.post("/api/users/login", (req: Request, res: Response, next: NextFunction): void => {
			UserController.login(req, res);
		});
	}
}