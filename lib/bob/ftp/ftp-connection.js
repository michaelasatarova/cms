"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpConnection = void 0;
const process_1 = __importDefault(require("process"));
class FtpConnection {
    constructor(user, password, host, port, secure, localRoot, remoteRoot, include, exclude, forcePasv) {
        this.user = '';
        this.password = '';
        this.host = '';
        this.port = 21;
        this.secure = true;
        this.secureOptions = {
            rejectUnauthorized: true
        };
        this.localRoot = './';
        this.remoteRoot = '/';
        this.include = [];
        this.exclude = [];
        this.deleteRemote = false;
        this.forcePasv = true;
        if (!user) {
            throw new Error('Missing option "user"');
        }
        this.user = this.parseEnvVar(user, user) || this.user;
        if (!password) {
            throw new Error('Missing option "password"');
        }
        this.password = this.parseEnvVar(password, password) || this.password;
        if (!host) {
            throw new Error('Missing option "host"');
        }
        this.host = this.parseEnvVar(host, host) || this.host;
        this.port = (typeof port === 'string' ? Number.parseInt(port, 10) : port) || this.port;
        if (!(1 <= this.port && this.port <= 65535)) {
            throw new Error(`Invalid port: ${this.port.toString()}`);
        }
        this.secure = (typeof secure === 'boolean' ? secure : this.parseEnvVar(secure, secure) || this.secure);
        this.localRoot = this.parseEnvVar(localRoot, localRoot) || this.localRoot;
        this.remoteRoot = this.parseEnvVar(remoteRoot, remoteRoot) || this.remoteRoot;
        try {
            this.include = JSON.parse(this.parseEnvVar(include, include)) || this.include;
        }
        catch (ex) {
            console.error(ex);
            throw new Error('Invalid JSON option value "include"');
        }
        if (exclude) {
            try {
                this.exclude = JSON.parse(this.parseEnvVar(exclude, exclude)) || this.exclude;
            }
            catch (ex) {
                console.error(ex);
                throw new Error('Invalid JSON option value "include"');
            }
        }
        forcePasv = typeof forcePasv === 'boolean'
            ? (forcePasv ? 'true' : 'false')
            : (typeof forcePasv === 'string'
                ? (this.parseEnvVar(forcePasv, forcePasv))
                : '');
        if (forcePasv === 'true' || forcePasv === 'false') {
            this.forcePasv = forcePasv === 'true';
        }
        console.log('config created');
        console.log(this);
    }
    parseEnvVar(rawVal, defaultVal) {
        if (typeof rawVal === 'string' && rawVal.charAt(0) === '#') {
            const parsedVal = process_1.default.env[rawVal.substr(1)];
            if (typeof parsedVal === 'string') {
                return parsedVal;
            }
        }
        return typeof defaultVal === 'string' ? defaultVal : '';
    }
}
exports.FtpConnection = FtpConnection;
