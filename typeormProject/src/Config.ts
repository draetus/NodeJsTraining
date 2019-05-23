export class Config {

	public static TESTING: boolean = false;
	public static DEBUG: boolean = true;
	
	public static JWT = {
		"expiresIn": null
	};

	public static DATABASES = {
		"main": {
			"host": "127.0.0.1",
			"port": 3306,
			"user": "root",
			"password": "0xff8029",
			"database": "test"
		},

		"test": {
			"host": null,
			"port": null,
			"user": null,
			"password": null,
			"database": null
		}
	};

	public static SERVERS = {
		"http": {
			"hostname": "localhost",
			"port": 4000
		},
		"https": {
			"hostname": null,
			"port": null,
			"ac": null,
			"key": null,
			"cert": null
		}
	};

	public static SMTP = {
		"host": "smtp.gmail.com",
		"port": 587,
		"secure" : false,
		"auth": {
			"user": "noreply@palmsoft.com.br",
			"pass": "hg3cc14p4qr7$a$K"
		},
		"email": "noreply@palmsoft.com.br",
		"aliasEmail": "Palmsoft",
		"limit": {
			"day": 500
		}
	};

	public static ENCRYPT_SECRET = "dha%j24sdj$k53*3h2#dsj$jsdf";


}