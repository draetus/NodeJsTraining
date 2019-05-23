import { Config } from "../Config";

import { createConnection, Connection } from "typeorm";

export class ConnectionUtil {

	public static async getConnection(): Promise<Connection> {

		//Escolhe database
		var database: any = Config.DATABASES.main;
		if (Config.TESTING && Config.DATABASES.test)
		{
			var database: any = Config.DATABASES.test;
		}

		//Cria conexão com o database
		var connection: Connection = await createConnection({
		    type: "mysql",
		    host: database.host,
		    port: database.port,
		    username: database.user,
		    password: database.password,
		    database: database.database,
		    entities: [
		        __dirname.slice(0,__dirname.length-5) + "/entity/*.js" // Entidades devem seguir o padrão do banco
		    ],
		    synchronize: true,
		    logging: false
		});

		return connection;
	}
}