export class PermissionBusiness {

	public static convertToObject(data: any): object
	{
		var permission: any = {};
		if (data.id){permission.id = parseInt(data.id);}
		if (data.idUser){permission.idUser = parseInt(data.idUser);}
		if (data.name){permission.name = data.name;}

		return permission;
	}
	
}