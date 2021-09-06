"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate = void 0;
const fs_1 = require("fs");
const process_1 = require("process");
class Migrate {
    constructor(config) {
        this._config = {
            in: '',
            out: '',
            replacements: []
        };
        if (typeof config !== 'object'
            || typeof config.in !== 'string'
            || typeof config.out !== 'string'
            || !Array.isArray(config.replacements)
            || config.replacements.length === 0) {
            throw new Error('Invalid Migrator configuration');
        }
        Object.assign(this._config, config);
    }
    run() {
        console.log('Migrate.run()');
        process_1.stdout.write('reading in file...');
        return fs_1.promises.readFile(this._config.in, { encoding: 'utf8', flag: 'r' })
            .then(value => {
            if (typeof value !== 'string'
                || value.length === 0) {
                console.log('skipped (empty)');
                return;
            }
            console.log('done');
            for (const replacement of this._config.replacements) {
                const needle = new RegExp(replacement.needle, 'gi');
                value = value.replace(needle, replacement.replacement);
            }
            process_1.stdout.write('writing out file...');
            return fs_1.promises.writeFile(this._config.out, value, { encoding: 'utf8', flag: 'w' })
                .then(() => { console.log('done'); }, err => {
                console.log('failed');
                console.error(err);
            });
        }, reason => {
            console.log('failed');
            console.error(reason);
        });
    }
    static parsedReplacementsStr(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return [];
        }
        const replacementsRaw = str.split(',');
        const replacements = [];
        for (let i = 0; i < replacementsRaw.length; ++i) {
            const replParts = replacementsRaw[i].split('=>');
            if (replParts.length !== 2) {
                throw new Error('Invalid replacements string.');
            }
            replacements.push({
                needle: replParts[0],
                replacement: replParts[1]
            });
        }
        return replacements;
    }
}
exports.Migrate = Migrate;
