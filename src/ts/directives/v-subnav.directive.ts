import { VDirective, VServices } from '@libTs/vue-base';
import { DirectiveBinding } from 'vue/types/options';

export const subnav: VDirective = [
  'subnav',
  {
    bind( el: HTMLElement, binding: DirectiveBinding ) {

      if ( binding.arg == 'activestate' ) {
        $( function () {
          let subNavItemIsActive = $( el ).find( '.sub-nav-active-link' ).length;
          if ( subNavItemIsActive ) {
            $( el ).find( '.webkit-header-navigation-link' ).addClass( 'webkit-header-navigation-activeLink' );
          }
        } );
      }

      if ( binding.arg == 'toggle' ) {
        el.addEventListener( 'click', function () {
          const allSubNavs = $( '.sub-nav-cell' );
          let subNav: JQuery<HTMLElement> = $( this ).parent().find( '.sub-nav-cell' );

          if ( subNav.length && subNav.hasClass( 'active-subnav' ) ) {
            allSubNavs.removeClass( 'active-subnav' );
          } else {
            allSubNavs.removeClass( 'active-subnav' );
            subNav.addClass( 'active-subnav' );
          }

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
        } );
      }

      $( function () {
        if ( binding.arg == 'width' ) {
          if ( window.innerWidth <= 768 ) {
            setSubNavWidth();
          }

          var resizeId: any;
          $( window ).on( 'resize', function () {
            if ( window.innerWidth <= 768 ) {
              setSubNavWidth();
              clearTimeout( resizeId );
              resizeId = setTimeout( doneResizing, 500 );
            } else {
              $( '.sub-nav-cell' ).css( 'width', '300px' );
              $( '.sub-nav-cell' ).css( 'left', 'auto' );
            }
          } );

          function doneResizing() {
            setSubNavWidth();
          }

          function setSubNavWidth() {
            const screenSize = window.innerWidth;
            const buttonSize = $( '.webkit-header-button-small' ).innerWidth();
            const subNav = $( '.sub-nav-cell' );

            if ( buttonSize ) {
              subNav.css( 'width', `${screenSize - buttonSize}px` );
              subNav.css( 'left', `-${screenSize - buttonSize}px` );
            }
          }
        }
      } );
    },
  },
];
