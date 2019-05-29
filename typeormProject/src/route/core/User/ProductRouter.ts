import { Application, NextFunction, Request, Response } from "express";

import { ProductController } from "../../../core/Product/ProductController";

export class ProductRouter
{
	public static init (express: Application)
	{
		express.post("/api/products", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.saveProduct(req, res);
		});

		express.put("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.updateProduct(req, res);
		});

		express.get("/api/products", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.getProduct(req, res);
		});

		express.get("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.getOneProduct(req, res);
		});

		express.delete("/api/products/:id", (req: Request, res: Response, next: NextFunction): void => {
			ProductController.deleteProduct(req, res);
		});
	}
}