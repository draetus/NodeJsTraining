import { Config } from "../Config";

import { createConnection, Connection, getConnection, QueryRunner } from "typeorm";

export class ConnectionUtil {

	public static async setup(): Promise<void>
	{
		//Escolhe database
		var database: any = Config.DATABASES.main;
		if (Config.TESTING && Config.DATABASES.test)
		{
			var database: any = Config.DATABASES.test;
		}

		//Cria conexão com o database
		await createConnection({
			name: "mysql-connection",
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
	}

	public static async getQueryRunner(): Promise<any>
	{
		const queryRunner: any = ConnectionUtil.getPool().createQueryRunner();
		await queryRunner.connect();
		return queryRunner;
	}

	public static getPool(): Connection {

		return getConnection("mysql-connection");
	}

	// public static async trand(con): Promise<Tans> {
	// 	return new Promise((resolve, reject): Tans => {
	// 		con.transaction((trans) => {
	// 			resolve(trans);
	// 		});
	// 	});
	// }
}