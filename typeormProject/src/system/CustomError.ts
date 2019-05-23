import { Config } from "../Config";

export class CustomError extends Error {

	public status: number = null;
	public extra: any = null;

	constructor(status: number, message: string, extra?: any) {
		super(message);

		//Configura o prototipo explicitamente
		Object.setPrototypeOf(this, CustomError.prototype);

		this.status = status;

		if (extra instanceof Error) {
			this.stack = extra.stack;
		} else {
			this.extra = extra;
		}
	}

	public getResponse(): object {
		const response: any = {
			"message": this.message,
			//"extra": this.extra,
			"stack": null
		};

		if (Config.DEBUG) {
			response.stack = this.stack;
		}

		return response;
	}


}
