import { AsyncComponent, Component } from 'vue';
import { ConstrFn } from './interfaces/basic.interface';
import { VComponent } from './v.component';
import { VDirective } from './v.directive';

/**
 * Basic module consisting of services, directives and components
 *
 * **Example config:**
 * ```typescript
 * const myModule: VModule = {
 *  services: [
 *    OverlaysService // class (should extend "VBaseService")
 *  ],
 *  directives: [
 *    OverlayDirective // const array of type VDirective
 *  ]
 * }
 * ```
 */
export interface VModule {
  /**
   * These services are available in HTML.
   * Only add services here if you really need access from within HTML.
   */
  services?: Array<ConstrFn<any>>;
  directives?: Array<VDirective>;
  components?: Array<VComponent> | { [ key: string ]: Component<any, any, any, any> | AsyncComponent<any, any, any, any>; };
}