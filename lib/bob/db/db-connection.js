"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const process_1 = __importDefault(require("process"));
class DBConnection {
    constructor(db, user, password, host, port) {
        var _a, _b, _c, _d, _e, _f;
        this.db = this.parseValue(db) || ((_b = (_a = process_1.default.env.DB_DSN) === null || _a === void 0 ? void 0 : _a.match(/dbname=(.+?)(?:;|$)/)) === null || _b === void 0 ? void 0 : _b[1]) || '';
        this.user = this.parseValue(user) || process_1.default.env.DB_USER || 'root';
        this.password = this.parseValue(password) || process_1.default.env.DB_PASSWORD || '';
        this.host = this.parseValue(host) || ((_d = (_c = process_1.default.env.DB_DSN) === null || _c === void 0 ? void 0 : _c.match(/host=(.+?)(?:;|$)/)) === null || _d === void 0 ? void 0 : _d[1]) || 'localhost';
        this.port = port || Number.parseInt(((_f = (_e = process_1.default.env.DB_DSN) === null || _e === void 0 ? void 0 : _e.match(/port=(.+?)(?:;|$)/)) === null || _f === void 0 ? void 0 : _f[1]) || '3306', 10) || 3306;
        if (Number.isNaN(this.port) || this.port < 1 || 65535 < this.port) {
            throw new Error(`Invalid db port: ${this.port.toString()}`);
        }
    }
    parseValue(rawVal, defaultVal) {
        if (typeof rawVal === 'string' && rawVal.charAt(0) === '#') {
            const parsedVal = process_1.default.env[rawVal.substr(1)];
            if (typeof parsedVal === 'string') {
                return parsedVal;
            }
        }
        return typeof defaultVal === 'string' ? defaultVal : '';
    }
}
exports.DBConnection = DBConnection;
