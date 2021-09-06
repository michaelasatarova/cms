<template>
  <div>
    <div class="webkit-textGrid-background">
      <div class="webkit-textGrid-container">
        <slot name="heading"></slot>
        <div class="webkit-textGrid-container-cell">
          <div class="webkit-textGrid-parent">
            <a
              class="webkit-textGrid-item"
              v-bind:key="index"
              v-for="(block, index) in displayedBlocks"
              v-bind:href="block.url || false"
              :target="block.target"
            >
              <div class="webkit-textGrid-item-grid">
                <div class="webkit-text-grid-date">
                  <div
                    class="m-auto text-f5 l:text-f5l m:text-f5m xs:text-f5xs font-bold"
                  >
                    {{ block.day }}
                  </div>
                </div>
                <div class="col-start-2 col-span-1 px-6 m:px-3 pt-4">
                  <div class="textGrid-inner-grid">
                    <div
                      class="webkit-textGrid-heading"
                      v-html="block.month + ' ' + block.year"
                    ></div>
                    <div
                      class="webkit-textGrid-text"
                      v-html="block.titel"
                    ></div>
                    <div class="webkit-textGrid-button-cell">
                      <div class="webkit-textGrid-button" v-if="block.url">
                        <div class="webkit-btn__icon">
                          <div class="btn-icon-text">Weiterlesen</div>
                          <i class="fal fa-arrow-circle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="webkit-textGrid-load-more-button-container">
          <div
            v-if="blocks.length > numberOfItemsToDisplay"
            v-on:click="showMore"
            class="flex mr-4"
          >
            <div v-if="loadmorebutton" class="webkit-btn__big">
              {{ loadmorebutton }}
            </div>
            <i v-else class="webkit-btn__small webkit-plus">
              {{ loadmorebutton }}
            </i>
          </div>
          <a :href="email" class="webkit-btn__big">Veranstaltung melden</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue, { VNode } from 'vue';
import * as textGridConfig from 'theme/modules/textGrid/theme.textGrid.config';

export default Vue.extend({
  name: 'WebkitTextGrid',
  props: {
    blocks: Array,
    loadmorebutton: String,
    email: String,
  },
  data() {
    return {
      numberOfItemsToDisplay: textGridConfig.loadMore.numberOfItemsToShow,
      increment: textGridConfig.loadMore.numberOfItemsIncrement,
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
