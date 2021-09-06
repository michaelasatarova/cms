<template>
  <div class="webkit-grid-container-cell">
    <div class="webkit-grid-parent">
      <a
        class="webkit-grid-item"
        v-bind:key="index"
        v-for="(block, index) in displayedBlocks"
        v-bind:href="block.url || false"
        :target="block.target"
      >
        <div class="webkit-grid-item-grid">
          <div class="webkit-grid-cell-background"></div>
          <div class="webkit-grid-cell-img">
            <div
              class="webkit-grid-image bg-img"
              v-if="block.image"
              v-bind:style="{
                backgroundImage: 'url(\'' + block.image + '\')',
              }"
            ></div>
          </div>
          <div class="webkit-grid-spacing-above-text"></div>
          <div
            class="webkit-grid-heading2"
            v-if="block.heading2 && showdate"
            v-html="block.heading2"
          ></div>
          <div class="webkit-grid-heading" v-html="block.heading"></div>
          <div
            class="webkit-grid-text"
            v-if="block.text"
            v-html="block.text"
          ></div>
          <div class="webkit-grid-button-cell">
            <div class="webkit-grid-button" v-if="block.url">
              <div class="webkit-btn__icon">
                <div class="btn-icon-text">Weiterlesen</div>
                <i class="fal fa-arrow-circle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div
      class="webkit-gallery-load-more-button-container pt-6"
      v-if="blocks.length > numberOfItemsToDisplay"
      v-on:click="showMore"
    >
      <div v-if="loadmorebutton" class="webkit-btn__big">
        {{ loadmorebutton }}
      </div>
      <i v-else class="webkit-btn__small webkit-plus">
        {{ loadmorebutton }}
      </i>
    </div>
  </div>
</template>

<script>
import Vue, { VNode } from 'vue';
import * as gridConfig from 'theme/modules/grid/theme.grid.config';

export default Vue.extend({
  name: 'WebkitGrid',
  props: {
    blocks: Array,
    loadmorebutton: String,
    showdate: String,
  },
  data() {
    return {
      numberOfItemsToDisplay: gridConfig.loadMore.numberOfItemsToShow,
      increment: gridConfig.loadMore.numberOfItemsIncrement,
      displayedBlocks: [],
    };
  },
  methods: {
    showMore: function () {
      this.numberOfItemsToDisplay += this.increment;
      this.numberOfItemsToDisplay = Math.min(
        this.numberOfItemsToDisplay,
        this.blocks.length
      );
      this.displayedBlocks = this.blocks.slice(0, this.numberOfItemsToDisplay);
    },
  },
  created() {
    this.displayedBlocks = this.blocks.slice(0, this.numberOfItemsToDisplay);
  },
});
</script>
