import { FtpDeployConfig } from 'ftp-deploy';
export declare class Ftp {
    private config;
    private ftp;
    constructor(config: FtpDeployConfig);
    run(): Promise<any>;
}
