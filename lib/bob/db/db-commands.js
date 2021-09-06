"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCommands = void 0;
class DBCommands {
    static createIfNotExists(connection) {
        if (connection.db.length === 0) {
            throw new Error('DB name cannot be empty');
        }
        return `echo CREATE DATABASE IF NOT EXISTS \`${connection.db}\``
            + ` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`
            + ` | mysql --host="${connection.host}"`
            + ` --port="${connection.port}"`
            + ` --user="${connection.user}"`
            + ` --password="${connection.password}"`;
    }
    static exportToFile(connection, sqlFilePath) {
        if (connection.db.length === 0) {
            throw new Error('DB name cannot be empty');
        }
        return `mysqldump --host="${connection.host}"`
            + ` --port="${connection.port}"`
            + ` --user="${connection.user}"`
            + ` --password="${connection.password}"`
            + ` ${connection.db}`
            + ` > "${sqlFilePath}"`;
    }
    static importFromFile(connection, sqlFilePath) {
        if (connection.db.length === 0) {
            throw new Error('DB name cannot be empty');
        }
        return `mysql --host="${connection.host}"`
            + ` --port="${connection.port}"`
            + ` --user="${connection.user}"`
            + ` --password="${connection.password}"`
            + ` ${connection.db}`
            + ` < "${sqlFilePath}"`;
    }
}
exports.DBCommands = DBCommands;
