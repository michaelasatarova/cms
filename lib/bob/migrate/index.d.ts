export interface IMigratorReplacement {
    needle: RegExp | string;
    replacement: string;
}
export interface IMigratorConfig {
    in: string;
    out: string;
    replacements: Array<IMigratorReplacement>;
}
export declare class Migrate {
    private _config;
    constructor(config: IMigratorConfig);
    run(): Promise<void | undefined>;
    static parsedReplacementsStr(str: string): Array<IMigratorReplacement>;
}
