export class ProductBusiness {

	public static convertToObject(data: any): object
	{
		var product: any = {};
		if (data.id){product.id = parseInt(data.id);}
		if (data.name){product.name = data.name;}
		if (data.price){product.price = parseFloat(data.price);}
		if (data.quantity){product.quantity = parseInt(data.quantity);}

		return product;
	}
	
}