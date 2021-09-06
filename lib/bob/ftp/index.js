"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ftp = void 0;
const ftp_deploy_1 = __importDefault(require("ftp-deploy"));
const Log_1 = require("../Log");
class Ftp {
    constructor(config) {
        this.config = config;
        this.ftp = new ftp_deploy_1.default();
        if (typeof config !== 'object' || config === null) {
            Log_1.Log.failure('Connection config missing', 'FTP');
            throw new Error();
        }
        Log_1.Log.success('Client ready', 'FTP');
    }
    run() {
        return this.ftp.deploy(this.config)
            .then((res) => {
            Log_1.Log.success('Deployment finished', 'FTP');
            console.log(res);
        })
            .catch((err) => {
            Log_1.Log.failure('Deployment failed', 'FTP');
            console.error(err);
        }).finally(() => {
            console.log('Ending connection');
            this.ftp.ftp.end().finally(
                () => this.ftp.ftp.destroy()
            );
        });
    }
}
exports.Ftp = Ftp;
