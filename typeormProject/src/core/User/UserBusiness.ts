import { User } from "../../entity/User";
import { UserValidator } from "./UserValidator";

export class UserBusiness {

	public static createUser(data: any): User {
		UserValidator.validateCreateUser(data);

		var user: User = new User();

		user.id = data.id;
		user.name = data.name;
		user.age = data.age;
		user.phone = data.phone;
		user.sex = data.sex;
		user.isHuman = data.isHuman;

		return user;
	}

	public static createFields(data: any): any {
		UserValidator.validateFields(data);

		var find_fields: any = {};

		if (data.id){find_fields.id = data.id;}
		if (data.name){find_fields.name = data.name;}
		if (data.age){find_fields.age = data.age;}
		if (data.phone){find_fields.phone = data.phone;}
		if (data.sex){find_fields.sex = data.sex;}
		if (data.isHuman){find_fields.isHuman = data.isHuman;}

		return find_fields;
	}

}