export declare abstract class Log {
    static info(msg: string, cat?: string): void;
    static warn(msg: string, cat?: string): void;
    static success(msg: string, cat?: string): void;
    static failure(msg: string, cat?: string): void;
    private static log;
    private static now;
}
