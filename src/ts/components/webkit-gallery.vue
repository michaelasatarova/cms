<template>
  <div class="webkit-gallery-container-cell">
    <div class="webkit-gallery-parent">
      <div
        class="webkit-gallery-item"
        v-for="(album, indexOuter) in displayedBlocks"
        v-bind:key="indexOuter"
      >
        <a
          class="webkit-gallery-item-grid"
          v-bind:href="album[0].url"
          :data-lightbox="'album-' + indexOuter"
          :data-title="album[0].description"
        >
          <div class="webkit-gallery-cell-background"></div>
          <div class="webkit-gallery-cell-overlay">
            <div class="webkit-gallery-cell-overlay-container">
              <div class="webkit-gallery-cell-overlay-icon">
                <i class="fal fa-plus"></i>
              </div>
              <div class="webkit-gallery-cell-overlay-text">
                {{ album.length }} Bilder
              </div>
            </div>
          </div>
          <div class="webkit-gallery-cell-img">
            <div
              class="webkit-gallery-image bg-img"
              v-bind:style="{
                backgroundImage: 'url(\'' + album[0].url + '\')',
              }"
            ></div>
          </div>
          <div class="webkit-gallery-heading" v-html="album[0].title"></div>
        </a>
        <!-- Won't be seen, but needed for lightbox -->
        <div v-for="(image, index) in album" v-bind:key="index">
          <a
            v-if="index > 0"
            v-bind:href="image.url"
            :data-lightbox="'album-' + indexOuter"
            :data-title="image.description"
          ></a>
        </div>
      </div>
    </div>
    <div
      class="webkit-gallery-load-more-button-container"
      v-if="blocks.length > numberOfItemsToDisplay"
      v-on:click="showMore"
    >
      <div v-if="loadmorebutton" class="webkit-btn__big">
        {{ loadmorebutton }} <i class="webkit-angleDown ml-2"></i>
      </div>
      <i v-else class="webkit-btn__small webkit-plus"></i>
    </div>

    <div
      class="webkit-gallery-load-less-button-container"
      v-if="
        displayedBlocks.length == blocks.length &&
        blocks.length != initialNumberOfItemsToShow &&
        blocks.length >= numberOfItemsToDisplay
      "
      v-on:click="showLess"
    >
      <div v-if="showlessbutton" class="webkit-btn__big">
        {{ showlessbutton }} <i class="webkit-angleUp ml-2"></i>
      </div>
      <i v-else class="webkit-btn__small webkit-minus"></i>
    </div>
  </div>
</template>

<script>
import Vue, { VNode } from "vue";
import * as galleryConfig from "theme/modules/gallery/theme.gallery.config";

export default Vue.extend({
  name: "WebkitGallery",
  props: {
    blocks: Array,
    loadmorebutton: String,
    showlessbutton: String,
  },
  data() {
    return {
      numberOfItemsToDisplay: galleryConfig.loadMore.numberOfItemsToShow,
      increment: galleryConfig.loadMore.numberOfItemsIncrement,
      initialNumberOfItemsToShow: galleryConfig.loadMore.numberOfItemsToShow,
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
    showLess: function () {
      this.numberOfItemsToDisplay = this.initialNumberOfItemsToShow;
      this.displayedBlocks = this.blocks.slice(0, this.numberOfItemsToDisplay);
    },
  },
  created() {
    this.displayedBlocks = this.blocks.slice(0, this.numberOfItemsToDisplay);
  },
});
</script>
