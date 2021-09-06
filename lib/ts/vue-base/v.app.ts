/* eslint-disable @typescript-eslint/ban-types */
import { ComponentOptions, DirectiveOptions } from 'vue';
import { Injector } from './helpers/Injector';
import { VAppConfig } from './v.app.config';
import { TVueComponent } from './v.component';
import { VModule } from './v.module';

export abstract class VApp {
  public static service( handle: string ): object | undefined {
    return Injector.get( handle );
  }

  public static createVueConfig(
    appConfig: VAppConfig
  ): ComponentOptions<any> {
    const data = {};
    const directives: { [ key: string ]: DirectiveOptions; } = {};
    const components: { [ key: string ]: TVueComponent; } = {};

    this.appendServices( data, appConfig );
    this.appendDirectives( directives, appConfig );
    this.appendComponents( components, appConfig );


    // loop through child modules
    if ( Array.isArray( appConfig.modules ) ) {
      for ( const module of appConfig.modules ) {
        this.appendServices( data, module );
        this.appendDirectives( data, module );
        this.appendComponents( components, module );
      }
    }

    return {
      el: appConfig.el,
      data,
      directives,
      components
    };
  }

  private static appendServices( data: object, module: VModule ): void {
    if ( module.services ) {
      for ( const svcConstr of module.services ) {
        const svcInst = Injector.instantiateAndPush( svcConstr, true );

        let token = ( svcInst as any ).constructor?.token; // defined in VBaseService
        if ( typeof token !== 'string' || token.length === 0 ) {
          token = Injector.tokenFromClassName( svcConstr.name, 'Service' );
        }

        if ( typeof svcInst !== 'undefined' ) {
          // add service instance to data object
          Object.defineProperty(
            data,
            token,
            {
              configurable: true,
              enumerable: true,
              value: svcInst,
              writable: true
            }
          );
        }
      }
    }
  }

  /**
   * Transforms a directive array configs into a directives object with
   * directive handle as key and directive options as value.
   *
   * @param {Array<VDirective>} [directivesArr]
   * @returns {{ [ key: string ]: DirectiveOptions; }}
   */
  private static appendDirectives(
    directives: { [ key: string ]: DirectiveOptions; },
    module: VModule
  ): void {
    if ( Array.isArray( module.directives ) ) {
      for ( const directive of module.directives ) {
        // destructure VDirective array
        const [ directiveHandle, directiveConfig ] = directive;

        if ( directiveHandle in directives ) {
          console.warn(
            `Directive "${directiveHandle}" already exists, skipped`
          );
        } else {
          Object.defineProperty(
            directives,
            directiveHandle,
            {
              configurable: false,
              enumerable: true,
              value: directiveConfig,
              writable: false
            }
          );
        }
      }
    }
  }

  private static appendComponents( components: { [ key: string ]: TVueComponent; }, module: VModule ): void {
    if ( Array.isArray( module.components ) ) {
      for ( const component of module.components ) {
        // destructure VComponent array
        const [ componentHandle, componentConfig ] = component;

        if ( componentHandle in components ) {
          console.warn(
            `Component "${componentHandle}" already exists, skipped`
          );
        } else {
          Object.defineProperty(
            components,
            componentHandle,
            {
              configurable: false,
              enumerable: true,
              value: componentConfig,
              writable: false
            }
          );
        }
      }
    } else if ( typeof module.components === 'object' && module.components ) {
      Object.assign( components, module.components );
    }
  }
}