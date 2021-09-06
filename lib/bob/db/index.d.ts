import { DBConnection } from "./db-connection";
export declare class DB {
    private connection;
    constructor(connection?: DBConnection);
    pull(sqlOutFilePath: string, connection?: DBConnection): void;
    push(sqlInFilePath: string, connection?: DBConnection, createDbIfNotExists?: boolean): void;
}
