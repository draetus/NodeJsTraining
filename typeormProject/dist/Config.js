"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.TESTING = false;
    Config.DEBUG = true;
    Config.JWT = {
        "expiresIn": null
    };
    Config.DATABASES = {
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
    Config.SERVERS = {
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
    Config.SMTP = {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false,
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
    Config.ENCRYPT_SECRET = "dha%j24sdj$k53*3h2#dsj$jsdf";
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map