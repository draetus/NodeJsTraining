"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var bodyParser = __importStar(require("body-parser"));
var fs = __importStar(require("fs"));
var compression_1 = __importDefault(require("compression"));
var RouterInit_1 = require("./route/core/RouterInit");
var Config_1 = require("./Config");
require("reflect-metadata");
var App = /** @class */ (function () {
    function App() {
        this.express = null;
        this.httpServer = null;
        this.httpsServer = null;
        this.express = express_1.default(); //Express é usado para rodar o servidor
        this.middleware(); // Executa funções relacionados a compressão e permissões
        RouterInit_1.RouterInit.init(this.express); // Inicializa as rotas
        console.log("Servidor pronto");
    }
    App.prototype.start = function () {
        // Inicializa servidor HTTP caso disponível
        if (Config_1.Config.SERVERS.http && Config_1.Config.SERVERS.http.port) {
            this.httpServer = http.createServer(this.express);
            if (!Config_1.Config.TESTING) {
                this.httpServer.listen(Config_1.Config.SERVERS.http.port, function () { });
            }
        }
        // Inicializa servidor HTTPS caso disponível
        if (Config_1.Config.SERVERS.https && Config_1.Config.SERVERS.https.port) {
            var config = {
                "hostname": Config_1.Config.SERVERS.https.hostname,
                "port": Config_1.Config.SERVERS.https.port,
                "ac": fs.readFileSync(Config_1.Config.SERVERS.https.ac),
                "key": fs.readFileSync(Config_1.Config.SERVERS.https.key),
                "cert": fs.readFileSync(Config_1.Config.SERVERS.https.cert)
            };
            this.httpsServer = https.createServer(config, this.express);
            if (!Config_1.Config.TESTING) {
                this.httpsServer.listen(Config_1.Config.SERVERS.https.port, function () { });
            }
        }
    };
    App.prototype.middleware = function () {
        // Habilita acesso ao servidor a qualquer um
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-uuid");
            next();
        });
        // Habilita parseamento automatico da requisição
        this.express.use(bodyParser.json({ "limit": "10mb" }));
        this.express.use(bodyParser.urlencoded({
            "extended": false,
            "limit": "10mb"
        }));
        // Ativa compressão de requisições
        this.express.use(compression_1.default());
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map