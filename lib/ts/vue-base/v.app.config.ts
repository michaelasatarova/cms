import { VModule } from './v.module';

/**
 * Basic config to create a Vue app consisting of services and directives and components
 *
 * **Example config:**
 * ```typescript
 * const config: VAppConfig = {
 *  el: '#vue-app',
 *  delimiters: [ '${', '}' ],
 *  services: [
 *    OverlaysService // class (should extend "VBaseService")
 *  ],
 *  directives: [
 *    OverlayDirective // const array of type VDirective
 *  ],
 *  modules: []
 * }
 * ```
 */
export interface VAppConfig extends VModule {
  el: Element | string;
  modules?: Array<VModule>;
}
