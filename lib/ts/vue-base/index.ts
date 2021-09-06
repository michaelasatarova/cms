import { ENV } from '@libTs/env';
import Vue from 'vue';
import { VApp } from './v.app';
import { VAppConfig } from './v.app.config';

Vue.config.productionTip = !ENV.isProduction;

export * from './v.app';
export * from './v.app.config';
export * from './v.directive';
export * from './v.module';
export * from './v.services';

export function createVueApp( config: VAppConfig ): void {
  // Debug
  if ( !ENV.isProduction ) {
    console.group( 'Vue App' );
  }
  // END Debug

  // create and return Vue VM
  const VUEAPP = new Vue( VApp.createVueConfig( config ) );

  // Debug
  if ( !ENV.isProduction ) {
    console.log( 'Vue app element:' );
    console.log( VUEAPP.$el );
    console.groupEnd();
  }
  // END Debug
}
