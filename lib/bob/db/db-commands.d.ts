import { DBConnection } from './db-connection';
export declare abstract class DBCommands {
    static createIfNotExists(connection: DBConnection): string;
    static exportToFile(connection: DBConnection, sqlFilePath: string): string;
    static importFromFile(connection: DBConnection, sqlFilePath: string): string;
}
