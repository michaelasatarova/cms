/* eslint-disable @typescript-eslint/ban-types */
export interface ConstrFn<T extends object> {
  new( ...args: Array<any> ): T;
}
