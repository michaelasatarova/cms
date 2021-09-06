/* eslint-disable @typescript-eslint/ban-types */
/**
 *	===============================================================================================
 *		 ____ _____ _   _          _______     __                 _____           _     _    _
 *		|  _ \_   _| \ | |   /\   |  __ \ \   / /                / ____|         | |   | |  | |
 *		| |_) || | |  \| |  /  \  | |__) \ \_/ /__  _ __   ___  | |  __ _ __ ___ | |__ | |__| |
 *		|  _ < | | | . ` | / /\ \ |  _  / \   / _ \| '_ \ / _ \ | | |_ | '_ ` _ \| '_ \|  __  |
 *		| |_) || |_| |\  |/ ____ \| | \ \  | | (_) | | | |  __/ | |__| | | | | | | |_) | |  | |
 *		|____/_____|_| \_/_/    \_\_|  \_\ |_|\___/|_| |_|\___|  \_____|_| |_| |_|_.__/|_|  |_|
 *
 *	===============================================================================================
 * @author	BINARY one GmbH
 * @license Unlicensed
 */

import { ENV } from '@libTs/env';
import { createVueApp } from '@libTs/vue-base';
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import { BASEURL, SITEURL } from './cms.globals';
import { SliderHelper } from './helpers/slider.helper';

// Component Imports
import Akkordeon from './components/akkordeon.vue';
import BannerNewsletter from './components/banner-newsletter.vue';
import IntroSlides from './components/intro-slides.vue';
import SlideShow from './components/slide-show.vue';
import TestimonialSlider from './components/testimonial-slider.vue';
import WebkitGallery from './components/webkit-gallery.vue';
import WebkitGrid from './components/webkit-grid.vue';
import WebkitTextGrid from './components/webkit-text-grid.vue';
import BoneInputText from './components/BoneInputText.vue';

// Directive Imports
import { overlay } from './directives/v-overlay.directive';
import { scroll } from './directives/v-scroll.directive';
import { video } from './directives/v-video.directive';
import { subnav } from './directives/v-subnav.directive';
import { videoBig } from './directives/v-videoBig.directive';

// Service Imports

// Plugin Imports

import './plugins/lightbox';

// other Imports
import './animations';

// -----------------------------------------------------------
// DEBUG output

if ( !ENV.isProduction ) {
  console.group( 'Environment loaded' );
  console.log( ENV );
  console.log(
    ' -----------------------------------\n',
    ` BASEURL:\t\t${BASEURL}\n`,
    ` SITEURL:\t\t${SITEURL}\n`,
    '-----------------------------------'
  );
  console.groupEnd();
}

// ----------------------------------------------------------
// Bare helpers, globally available

const HELPERS = {
  slider: new SliderHelper( '.slider' )
};


// -----------------------------------------------------------
// Vue app

createVueApp(
  // ----------------------------
  // App config
  // It is similar but not equal to "new Vue( { ... } );"
  {
    el: '#app',
    services: [],
    directives: [ overlay, scroll, video, subnav, videoBig ],
    components: {
      Akkordeon,
      BannerNewsletter,
      IntroSlides,
      SlideShow,
      TestimonialSlider,
      WebkitGallery,
      WebkitGrid,
      WebkitTextGrid,
      BoneInputText
    },
    modules: [],
  }
);

// Add Axios plugin for AJAX requests
Vue.use( VueAxios, axios );

setTimeout(
  () => {
    HELPERS.slider.initSliders();
  }
);