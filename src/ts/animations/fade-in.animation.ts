import { gsap, TweenLite } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as animations from "theme/base/animations.config.js";
import * as IEnvironment from '@libTs/env';

let animationActive = false;
let scrollerPosition = animations.scrollerPosition;

const ENV = IEnvironment.ENV;

if ( ENV.isProduction ) {
  if ( ENV.name != "dev" && animations.animationStaging ) {
    animationActive = true;
  } else {
    animationActive = false;
  }
} else {
  animationActive = animations.animationDev;
}

if ( window.innerWidth <= 480 ) {
  scrollerPosition = animations.scrollerPositionMobile;
} else {
  scrollerPosition = animations.scrollerPosition;
}

if ( animationActive ) {
  gsap.registerPlugin( ScrollTrigger );

  $( window ).on( "load", reloaded );
  function reloaded() {
    ScrollTrigger.refresh( true );
  }
  $( () => {
    let modularContent = gsap.utils.toArray( ".fade-in-animation" );

    modularContent.forEach( function ( value: HTMLElement, index ) {
      let classList = animations.modulesToNotAnimate as Array<string>;
      let child: HTMLElement = value.firstChild as HTMLElement;
      if ( classList.some( className => child.classList.contains( className ) ) ) {
        return;
      } else {
        const anim = TweenLite.fromTo(
          value,
          {
            autoAlpha: 0,
            y: animations.yStartpoint,
            x: animations.xStartpoint,
          },
          {
            autoAlpha: 1,
            y: animations.yEndpoint,
            x: animations.xEndpoint,
            duration: 1 * animations.animationDurationMultiplier,
            clearProps: "all"
          }
        );
        ScrollTrigger.create( {
          trigger: value,
          start: `top ${scrollerPosition}`,
          animation: anim,
          markers: animations.activateMarkers,
          toggleActions: animations.toggleActions,
        } );
      }
    } );
  } );
}