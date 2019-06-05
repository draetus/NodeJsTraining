import express from "express";
import * as http from "http";
import * as https from "https";
import * as bodyParser from "body-parser";
import * as fs from "fs";
import compression from "compression";


import { NextFunction, Request, Response } from "express";
import { RouterInit } from "./route/core/RouterInit";
import { Config } from "./Config";

import "reflect-metadata";
import { ConnectionUtil } from "./util/ConnectionUtil";

export class App {

	public express: express.Application = null;

	private httpServer: http.Server = null;
	private httpsServer: https.Server = null;

	constructor() {
		this.express = express(); //Express é usado para rodar o servidor

		this.middleware(); // Executa funções relacionados a compressão e permissões

		RouterInit.init(this.express); // Inicializa as rotas

		ConnectionUtil.setup();

		console.log("Servidor pronto");
	}

	public start(): void {
		// Inicializa servidor HTTP caso disponível
		if (Config.SERVERS.http && Config.SERVERS.http.port) {
			this.httpServer = http.createServer(this.express);

			if (!Config.TESTING) {
				this.httpServer.listen(Config.SERVERS.http.port, (): void => {});
			}
		}

		// Inicializa servidor HTTPS caso disponível
		if (Config.SERVERS.https && Config.SERVERS.https.port) {
			const config = {
				"hostname": Config.SERVERS.https.hostname,
				"port": Config.SERVERS.https.port,
				"ac": fs.readFileSync(Config.SERVERS.https.ac),
				"key": fs.readFileSync(Config.SERVERS.https.key),
				"cert": fs.readFileSync(Config.SERVERS.https.cert)
			};
			this.httpsServer = https.createServer(config, this.express);

			if (!Config.TESTING) {
				this.httpsServer.listen(Config.SERVERS.https.port, (): void => {});
			}

			
		}
	}

	private middleware(): void {
		// Habilita acesso ao servidor a qualquer um
		this.express.use((req: Request, res: Response, next: NextFunction): void => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-uuid");
			next();
		});

		// Habilita parseamento automatico da requisição
		this.express.use(bodyParser.json({"limit": "10mb"}));
		this.express.use(bodyParser.urlencoded({
			"extended": false,
			"limit": "10mb"
		}));

		// Ativa compressão de requisições
		this.express.use(compression());
	}


}
