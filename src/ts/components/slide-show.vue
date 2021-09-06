<template>
  <div
    class="webkit-slideshow-container"
    :class="index == 1 ? 'webkit-spacing-first' : 'webkit-spacing-normal'"
  >
    <div class="webkit-slideshow" v-if="slides.length > 1">
      <agile :throttleDelay="0" :autoplay="false" :autoplaySpeed="5000">
        <div class="slide grid" v-for="slide in slides">
          <div
            class="webkit-slide-image col-start-1 col-end-1 row-start-1 row-end-1"
            v-bind:style="{ backgroundImage: 'url(\'' + slide.image + '\')' }"
          >
            <img class="img-hidden" :src="slide.image" :alt="slide.alt" />
          </div>
          <div v-if="slide.text" class="webkit-slide-bg"></div>
          <div class="webkit-slide-text-container">
            <div class="webkit-slide-text">{{ slide.text }}</div>
            <div class="webkit-slide-button-container" v-if="slide.link">
              <a class="webkit-slide-button" :href="slide.link">
                <div class="webkit-btn__reversed" v-if="slide.linkText">
                  {{ slide.linkText }}
                </div>
                <i class="webkit-btn__small webkit-arrow-right" v-else></i>
              </a>
            </div>
          </div>
        </div>
      </agile>
    </div>

    <div class="webkit-slideshow" v-else-if="slides.length > 0">
      <div class="slide grid">
        <div
          class="webkit-slide-image col-start-1 col-end-1 row-start-1 row-end-1"
          v-bind:style="{ backgroundImage: 'url(\'' + slides[0].image + '\')' }"
        >
          <img class="img-hidden" :src="slides[0].image" :alt="slides[0].alt" />
        </div>
        <div v-if="slides[0].text" class="webkit-slide-bg"></div>
        <div class="webkit-slide-text-container">
          <div class="webkit-slide-text">{{ slides[0].text }}</div>
          <div class="webkit-slide-button-container" v-if="slides[0].link">
            <a class="webkit-slide-button" :href="slides[0].link">
                <div class="webkit-btn__reversed" v-if="slides[0].linkText">
                  {{ slides[0].linkText }}
                </div>
                <i class="webkit-btn__small webkit-arrow-right" v-else></i>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue, { VNode } from 'vue';
import { VueAgile } from 'vue-agile';

export default Vue.extend({
  name: 'SlideShow',
  props: ['slides', 'index'],
  components: {
    agile: VueAgile,
  },
  data() {
    //read slider config from config file
    return {
      autoplay: true,
    };
  },
});
</script>
