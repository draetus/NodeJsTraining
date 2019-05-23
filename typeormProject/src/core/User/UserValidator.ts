import { CustomError } from "../../system/CustomError";
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

		throw new CustomError(400, Messages.ERROR_NO_FIELD, new Error);
	}
	
}