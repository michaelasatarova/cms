import { VDirective, VServices } from '@libTs/vue-base';
import { DirectiveBinding } from 'vue/types/options';

export const overlay: VDirective = [
  'overlay',
  {
    bind( el: HTMLElement, binding: DirectiveBinding ) {
      if ( binding.arg == 'show' ) {
        el.addEventListener( 'click', function () {
          $( '.webkit-header-nav-overlay' ).addClass( 'overlay-active' );
          $( 'html' ).css( 'overflow', 'hidden' );
        } );
      }

      if ( binding.arg == 'hide' ) {
        el.addEventListener( 'click', function () {
          const openIcon = $( '.open-icon' );
          const closeIcon = $( '.close-icon' );
          const overlay = $( '.header-active-overlay' );

          overlay.addClass( 'hidden' );
          openIcon.removeClass( 'hidden' );
          closeIcon.addClass( 'hidden' );
          $( '.webkit-header-nav-overlay' ).removeClass( 'overlay-active' );
          $( 'html' ).css( 'overflow', 'auto' );
        } );
      }

      if ( binding.arg == 'toggle' ) {
        el.addEventListener( 'click', function () {
          const navOverlay = $( '.webkit-header-nav-overlay' );
          const openIcon = $( '.open-icon' );
          const closeIcon = $( '.close-icon' );
          const overlay = $( '.header-active-overlay' );
          const activeSubnavLink = $( '.sub-nav-active-link' );
          const allSubNavs = $( '.sub-nav-cell' );

          if ( activeSubnavLink[ 0 ] ) {
            const subNavToActivate = activeSubnavLink.parent().parent().parent();
            subNavToActivate.addClass( 'active-subnav' );
            allSubNavs.each( ( index, el ) => {
              const icon = $( el ).parent().find( 'i' );
              const link = $( el ).parent().find( 'a' );
              if ( $( el ).hasClass( 'active-subnav' ) ) {
                icon.addClass( 'force-icon-color4' );
                link.addClass( 'active-subnav-main' );
              } else {
                icon.removeClass( 'force-icon-color4' );
                link.removeClass( 'active-subnav-main' );
              }
            } );
          }

          if ( navOverlay.hasClass( 'overlay-active' ) ) {
            overlay.addClass( 'hidden' );
            openIcon.removeClass( 'hidden' );
            closeIcon.addClass( 'hidden' );
            navOverlay.removeClass( 'overlay-active' );
            $( 'html' ).css( 'overflow', 'auto' );
          } else {
            overlay.removeClass( 'hidden' );
            openIcon.addClass( 'hidden' );
            closeIcon.removeClass( 'hidden' );
            navOverlay.addClass( 'overlay-active' );
            $( 'html' ).css( 'overflow', 'hidden' );
          }
        } );
      }
    },
  },
];
