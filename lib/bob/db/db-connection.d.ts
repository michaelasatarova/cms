export declare class DBConnection {
    readonly db: string;
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
    constructor(db?: string, user?: string, password?: string, host?: string, port?: number);
    private parseValue;
}
