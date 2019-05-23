import { Messages } from "../../Messages";

export class UserValidator {

	public static validateFields(data: any): void
	{
		if (data.id){return;}
		if (data.name){return;}
		if (data.age){return;}
		if (data.phone){return;}
		if (data.sex){return;}
		if (data.isHuman){return;}

		throw new Error(Messages.ERROR_NO_FIND_FIELD);
	}

	public static validateCreateUser(data: any): void {

		if (data.id){return;}
		if (data.name){return;}
		if (data.age){return;}
		if (data.phone){return;}
		if (data.sex){return;}
		if (data.isHuman){return;}

		throw new Error(Messages.ERROR_NO_USER_DATA);
	}
	
}