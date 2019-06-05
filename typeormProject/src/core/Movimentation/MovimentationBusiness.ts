export class MovimentationBusiness {

	public static convertToObject(data: any): object
	{
		var movimentation: any = {};
		if(data.id){movimentation.id = data.id};
		if(data.idProduct){movimentation.idProduct = data.idProduct};
		if(data.idUser){movimentation.idUser = data.idUser};
		if(data.date){movimentation.date = data.date};
		if(data.price){movimentation.price = data.price};
		if(data.quantity){movimentation.quantity = data.quantity};

		return movimentation;
	}

}