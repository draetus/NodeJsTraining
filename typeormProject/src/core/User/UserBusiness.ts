export class UserBusiness {

	public static convertToObject(data: any): object
	{
		var user: any = {};
		if (data.id){user.id = data.id;}
		if (data.login){user.login = data.login;}
		if (data.password){user.password = data.password;}
		if (data.name){user.name = data.name;}
		if (data.age){user.age = data.age;}
		if (data.isHuman){user.isHuman = data.isHuman;}
		if (data.balance){user.balance = data.balance;}

		return user;
	}

}