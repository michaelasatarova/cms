"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const db_1 = require("./db");
const db_connection_1 = require("./db/db-connection");
const ftp_1 = require("./ftp");
const ftp_connection_1 = require("./ftp/ftp-connection");
const Log_1 = require("./Log");
const migrate_1 = require("./migrate");
const Texts_1 = require("./Texts");
const argv = minimist_1.default(process.argv.slice(2));
async function loadDotenv() {
    let dotenvLoaded = await Promise.resolve().then(() => __importStar(require('dotenv'))).then(dotenv => dotenv.config()).catch(() => undefined);
    if (dotenvLoaded && dotenvLoaded.error) {
        throw dotenvLoaded.error;
    }
}
async function main() {
    var _a, _b, _c, _d;
    Texts_1.Texts.Welcome();
    Log_1.Log.info('Bob dä Buumaa isch immer für dich daa!');
    switch (argv._[0]) {
        case 'db':
            if (!argv.skipDotenv) {
                await loadDotenv();
            }
            const db = new db_1.DB(new db_connection_1.DBConnection(argv.db, argv.user, argv.password, argv.host, argv.port));
            switch (argv._[1]) {
                case 'pull':
                    if ((_b = (_a = argv._) === null || _a === void 0 ? void 0 : _a[2]) === null || _b === void 0 ? void 0 : _b.length) {
                        db.pull(argv._[2]);
                    }
                    else {
                        console.log('Missing sql output file path');
                        process.exit(10);
                    }
                    break;
                case 'push':
                    if ((_d = (_c = argv._) === null || _c === void 0 ? void 0 : _c[2]) === null || _d === void 0 ? void 0 : _d.length) {
                        const createDb = typeof argv.createDb === 'boolean' ? argv.createDb : argv.createDb !== 'false';
                        db.push(argv._[2], undefined, createDb);
                    }
                    else {
                        console.log('Missing sql input file path');
                        process.exit(11);
                    }
                    break;
                default:
                    console.log('nothing to do in DB command');
            }
            break;
        case 'migrate':
            if (!argv.skipDotenv) {
                await loadDotenv();
            }
            const migConfig = {
                in: argv.in,
                out: argv.out,
                replacements: migrate_1.Migrate.parsedReplacementsStr(argv.replacements)
            };
            const migrate = new migrate_1.Migrate(migConfig);
            return migrate.run();
        case 'ftp':
            if (!argv.skipDotenv) {
                await loadDotenv();
            }
            const ftpConfig = new ftp_connection_1.FtpConnection(argv.user, argv.password, argv.host, argv.port, argv.secure, argv.localRoot, argv.remoteRoot, argv.include, argv.exclude, argv.forcePasv);
            const deploy = new ftp_1.Ftp(ftpConfig);
            return deploy.run();
        default:
            Texts_1.Texts.Help();
    }
}
main().then(() => {
    console.log('\nBob over and out =)\n');
    process.exit(0);
}, (err) => {
    console.error('ERROR occurred');
    console.error(err.message);
    process.exit(1);
});
