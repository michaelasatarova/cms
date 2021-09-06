<template>
  <div class="webkit-akkordeon-entry">
    <div @click="show = !show" class="webkit-akkordeon-title">
      <div class="webkit-akkordeon-title-text">{{ heading }}</div>
      <div class="webkit-akkordeon-icon-container">
        <i
          v-bind:class="{
            'fal fa-arrow-circle-up webkit-akkordeon-active': show,
            'fal fa-arrow-circle-down': !show,
          }"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    <div
      class="webkit-akkordeon-text-container"
      :class="{ 'akkordeon-active': show }"
      ref="akkordeonContainer"
    >
      <div
        v-if="text"
        class="webkit-akkordeon-text webkit-redactor-content"
        ref="akkordeonText"
        v-html="text"
      ></div>
      <div
        class="col-start-1 col-end-18 row-start-2 row-span-1"
        ref="akkordeonLinks"
      >
        <slot name="download"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'Akkordeon',
  props: {
    heading: String,
    text: String,
  },

  data() {
    return {
      show: false,
    };
  },
  updated: function () {
    let height = this.$refs.akkordeonText
      ? this.$refs.akkordeonText.clientHeight
      : 0;
    let buttonHeight = this.$refs.akkordeonLinks
      ? this.$refs.akkordeonLinks.clientHeight
      : 0;

    if (this.show) {
      this.$refs.akkordeonContainer.style.height = height + buttonHeight + 'px';
    } else {
      this.$refs.akkordeonContainer.style.height = 0;
    }
  },
});
</script>
