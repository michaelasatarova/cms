<template>
  <div class="webkit-testimonial-outer-grid">
    <div class="webkit-testimonial-cell">
      <agile :throttleDelay="0" v-if="slides.length > 1">
        <a
          class="webkit-testimonial-container overflow-hidden relative"
          :href="slide.link"
          :target="slide.target"
          v-for="(slide, index) in slides"
          v-bind:key="slide.title + '-' + index"
        >
          <div class="webkit-testimonial-grid">
            <div class="webkit-testimonial-image-container">
              <div
                class="webkit-testimonial-image"
                v-bind:style="{
                  backgroundImage: 'url(\'' + slide.image + '\')',
                }"
              >
                <img class="img-hidden" :src="slide.image" :alt="slide.alt" />
                <div class="webkit-testimonial-image-aspect"></div>
              </div>
            </div>
            <div class="webkit-testimonial-title">{{ slide.title }}</div>
            <div class="webkit-testimonial-text">
              {{ slide.text }}
            </div>
            <div v-if="slide.link" class="webkit-testimonial-button-container">
              <div class="webkit-testimonial-button">
                <div v-if="slide.linkText" class="webkit-btn__big">
                  {{ slide.linkText }}
                </div>
                <i v-else class="webkit-btn__small webkit-arrow-right"></i>
              </div>
            </div>
          </div>
        </a>
      </agile>
      <slot v-else name="testimonial-single"></slot>
    </div>
  </div>
</template>

<script>
import Vue, { VNode } from "vue";
import { VueAgile } from "vue-agile";

export default Vue.extend({
  name: "TestimonialSlider",
  props: ["slides"],
  components: {
    agile: VueAgile,
  },
});
</script>
