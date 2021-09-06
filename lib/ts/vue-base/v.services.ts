/* eslint-disable @typescript-eslint/ban-types */
import { Injector } from './helpers/Injector';
import { ConstrFn } from './interfaces/basic.interface';

export abstract class VBaseService {
  /**
   * Dependency injection token name of this service
   */
  public static readonly token: string;
}

/**
 * Object containing service handles as keys and service classes as values.
 *
 * **Example:**
 * ```typescript
 * const SERVICES = VServices({ overlays: OverlaysService, someSvc: SomeService });
 * ```
 */
type VDependencies<T extends object> = {
  [ P in keyof T ]: ConstrFn<T[ P ]>;
};

type VServices<T extends object> = {
  [ P in keyof T ]: T[ P ];
};

/**
 * Gets and / or creates instances of the given service dependencies.
 *
 * **Usage:**
 * ```typescript
 * // all imports here ...
 *
 * const SERVICES = VServices( { overlays: OverlaysService } );
 *
 * export const SomeDirective: VDirective = [
 *  'somedirective',
 *  {
 *    bind() {
 *      // use service
 *       SERVICES.overlays.register('someoverlay');
 *    }
 *  }
 * ];
 * ```
 *
 * @param {VDependencies} dependencies
 * @returns {VServices<VDependencies>}
 */
export const VServices = <T extends object>( dependencies: VDependencies<T> ): VServices<T> => {
  const services = {} as VServices<T>;

  for ( const key in dependencies ) {
    const serviceInst = Injector.instantiateAndPush( ( dependencies as any )[ key ], true );

    Object.defineProperty(
      services,
      key,
      {
        configurable: false,
        enumerable: true,
        value: serviceInst,
        writable: false
      }
    );
  }

  return services;
};
