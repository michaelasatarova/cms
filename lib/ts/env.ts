declare const ENVIRONMENT: IEnvironment;
export const ENV: IEnvironment = ENVIRONMENT;

export interface IEnvironment {
  /**
   * Compress?
   */
  isProduction: boolean;
  /**
   * Show debug output (console)?
   */
  debug?: boolean;
  name: 'dev' | 'staging' | 'production' | string;
}