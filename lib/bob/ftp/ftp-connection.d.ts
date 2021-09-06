import { FtpDeployConfig } from 'ftp-deploy';
export declare class FtpConnection implements FtpDeployConfig {
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
    readonly secure: boolean | 'control' | 'implicit';
    readonly secureOptions: {
        rejectUnauthorized: boolean;
    };
    readonly localRoot: string;
    readonly remoteRoot: string;
    readonly include: Array<string>;
    readonly exclude: Array<string>;
    readonly deleteRemote: boolean;
    readonly forcePasv: boolean;
    constructor(user?: string, password?: string, host?: string, port?: string, secure?: string, localRoot?: string, remoteRoot?: string, include?: string, exclude?: string, forcePasv?: string);
    private parseEnvVar;
}
