<template>
  <div class="webkit-intro-slides">
    <agile
      :throttleDelay="0"
      :autoplay="config.autoplay"
      :autoplaySpeed="config.autoplaySpeed"
      :fade="config.fade"
      :speed="config.speed"
      :timing="config.timing"
      v-if="slides.length > 1"
    >
      <div class="slide grid" v-for="slide in slides">
        <div
          class="webkit-intro-slider-background-image col-start-1 col-end-1 row-start-1 row-end-1"
          v-bind:style="{ backgroundImage: 'url(\'' + slide.image + '\')' }"
        ></div>
      </div>
      <template slot="prevButton">
        <i class="fal fa-arrow-left webkit-intro-slider-prev"></i>
      </template>
      <template slot="nextButton">
        <i class="fal fa-arrow-right webkit-intro-slider-next"></i>
      </template>
    </agile>
    <slot v-else name="single-image"></slot>
  </div>
</template>

<script>
import Vue, { VNode } from "vue";
import { VueAgile } from "vue-agile";
import * as sliderConfig from "theme/modules/intro/theme.introSlider.config";

export default Vue.extend({
  name: "IntroSlides",
  props: ["slides", "index"],
  data: function () {
    return {
      config: sliderConfig,
    };
  },
  components: {
    agile: VueAgile,
  },
});
</script>
