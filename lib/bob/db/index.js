"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const db_connection_1 = require("./db-connection");
const child_process_1 = require("child_process");
const db_commands_1 = require("./db-commands");
class DB {
    constructor(connection) {
        if (connection instanceof db_connection_1.DBConnection) {
            this.connection = connection;
        }
        else {
            this.connection = new db_connection_1.DBConnection();
        }
    }
    pull(sqlOutFilePath, connection) {
        if (!(connection instanceof db_connection_1.DBConnection)) {
            connection = this.connection;
        }
        console.log('DB.pull()');
        console.log(`Connecting to db "${connection.db}" on "${connection.host}:${connection.port}"`
            + ` with user "${connection.user}"...`);
        try {
            child_process_1.execSync(db_commands_1.DBCommands.exportToFile(connection, sqlOutFilePath));
            console.log('DB.pull() done');
        }
        catch (err) {
            console.error('DB.pull() failed');
            if (err && err.message && err.message.length) {
                console.error(err.message);
            }
        }
    }
    push(sqlInFilePath, connection, createDbIfNotExists) {
        if (!(connection instanceof db_connection_1.DBConnection)) {
            connection = this.connection;
        }
        createDbIfNotExists = createDbIfNotExists !== false;
        console.log('DB.push()');
        console.log(`Connecting to db "${connection.db}" on "${connection.host}:${connection.port}"`
            + ` with user "${connection.user}"...`);
        if (createDbIfNotExists) {
            try {
                child_process_1.execSync(db_commands_1.DBCommands.createIfNotExists(connection));
                console.log('DB create if not exists: done');
            }
            catch (err) {
                console.error('DB create if not exists: failed');
                if (err && err.message && err.message.length) {
                    console.error(err.message);
                }
                return;
            }
        }
        try {
            child_process_1.execSync(db_commands_1.DBCommands.importFromFile(connection, sqlInFilePath));
            console.log('DB.push() done');
        }
        catch (err) {
            console.error('DB.push() failed');
            if (err && err.message && err.message.length) {
                console.error(err.message);
            }
        }
    }
}
exports.DB = DB;
