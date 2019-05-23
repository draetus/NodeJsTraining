import { Application, NextFunction, Request, Response } from "express";

import { UserController } from "../../../core/User/UserController";

export class UserRouter {

	public static init(express: Application){

		// Body {
		// 	name: string
		// 	age: number
		// 	phone: number
		// 	sex: string
		// 	isHuman: boolean }
		express.post("/api/user", (req: Request, res: Response, next: NextFunction): void => {
			UserController.saveUser(req, res);
		});

		// Opcionais (?exemplo="Nome") {
		// 	id: number
		// 	name: string
		// 	age: number
		// 	phone: number
		// 	sex: string
		// 	isHuman: boolean }
		// 
		// Body {
		// 	name: string
		// 	age: number
		// 	phone: number
		// 	sex: string
		// 	isHuman: boolean }
		express.put("/api/user", (req: Request, res: Response, next: NextFunction): void => {
			UserController.updateUser(req, res);
		});

		// Opcionais (?exemplo="Nome") {
		// 	id: number
		// 	name: string
		// 	age: number
		// 	phone: number
		// 	sex: string
		// 	isHuman: boolean }
		express.get("/api/user", (req: Request, res: Response, next: NextFunction): void => {
			UserController.getUser(req, res);
		});

		// Opcionais (?exemplo="Nome") {
		// 	id: number
		// 	name: string
		// 	age: number
		// 	phone: number
		// 	sex: string
		// 	isHuman: boolean }
		express.delete("/api/user", (req: Request, res: Response, next: NextFunction): void => {
			UserController.deleteUser(req, res);
		});
	}
}