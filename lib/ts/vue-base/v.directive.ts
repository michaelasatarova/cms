import { DirectiveOptions } from 'vue';

/**
 * Directive object
 *
 * **Example usage:**
 * ```typescript
 * // all imports here ...
 *
 * const SERVICES = VServices( { overlays: OverlaysService } );
 *
 * export const SomeDirective: VDirective = [
 *  'somedirective', // Directive attribute => "v-somedirective"
 *  {
 *    bind( el: HTMLElement, binding: DirectiveBinding ) {
 *      // use service
 *       SERVICES.overlays.register('someoverlay');
 *    }
 *    // other lifecycle functions here...
 *  }
 * ];
 * ```
 */
export type VDirective = [ string, DirectiveOptions ];