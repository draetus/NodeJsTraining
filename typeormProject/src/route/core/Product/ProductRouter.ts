import { Application, NextFunction, Request, Response } from "express";

import { ProductController } from "../../../core/Product/ProductController";

export class ProductRouter
{
	public static init (express: Application)
	{
		// Body {
		// 	name: string
		// 	price: number 
		// 	quantity: number  - Opcional
		// }
		express.post("/api/products", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.saveProduct(req, res);
		});

		// Body {
		// 	name: string
		// 	price: number 
		// 	quantity: number  - Opcional
		// }
		// Params {
		// 	id: number
		// }
		express.put("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.updateProduct(req, res);
		});

		// Opcionais {
		//  id: number
		// 	name: string
		// 	price: number 
		// 	quantity: number  - Opcional
		// }
		express.get("/api/products", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.getProduct(req, res);
		});

		// Params {
		// 	id: number
		// }
		express.get("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.getOneProduct(req, res);
		});

		// Params {
		// 	id: number
		// }
		express.delete("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.deleteProduct(req, res);
		});
	}
}