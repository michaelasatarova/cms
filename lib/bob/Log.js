"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const chalk_1 = require("chalk");
class Log {
    static info(msg, cat) {
        if (typeof cat !== 'string' || cat.length === 0) {
            cat = '';
        }
        Log.log(console.log, chalk_1.white(msg), chalk_1.white(cat));
    }
    static warn(msg, cat) {
        if (typeof cat !== 'string' || cat.length === 0) {
            cat = '';
        }
        Log.log(console.warn, chalk_1.yellow(msg), chalk_1.yellow(cat));
    }
    static success(msg, cat) {
        if (typeof cat !== 'string' || cat.length === 0) {
            cat = '';
        }
        Log.log(console.log, chalk_1.green(msg), chalk_1.green(cat));
    }
    static failure(msg, cat) {
        if (typeof cat !== 'string' || cat.length === 0) {
            cat = '';
        }
        Log.log(console.error, chalk_1.yellow(msg), chalk_1.yellow(cat));
    }
    static log(logger, msg, cat) {
        logger(chalk_1.white('[' + Log.now() + ']') + `${cat}: ${msg}`);
    }
    static now() {
        const now = new Date();
        return now.toTimeString().substr(0, 8);
    }
}
exports.Log = Log;
