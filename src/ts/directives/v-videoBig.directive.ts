import { VDirective, VServices } from '@libTs/vue-base';
import { DirectiveBinding } from 'vue/types/options';

export const videoBig: VDirective = [
  'videoBig',
  {
    bind( el: HTMLElement, binding: DirectiveBinding ) {
      if ( binding.arg == "play" ) {
        el.addEventListener( "click", function () {
          $( this ).hide();
          console.log('test');
          $( '.webkit-video-iframe' ).each( function ( this: HTMLIFrameElement ): void {
            if ( binding.value == this.getAttribute( 'data-ytid' ) ) {
              $( this ).parent().show();
              this.src += "&autoplay=1";
            }
          } );
        } );
      }
    }
  }
];