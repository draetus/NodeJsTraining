export class ProductBusiness {

	public static convertToObject(data: any): object
	{
		var product: any = {};
		if (data.id){product.id = data.id;}
		if (data.name){product.name = data.name;}
		if (data.price){product.price = data.price;}
		if (data.quantity){product.quantity = data.quantity;}

		return product;
	}
	
}