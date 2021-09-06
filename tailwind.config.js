const CONFIG = {
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    animations: require ('./webkit-theme/base/animations.config'),
    akkordeon: require( './webkit-theme/modules/akkordeon/theme.akkordeon.config' ),
    anchor: require( './webkit-theme/modules/anchor/theme.anchor.config' ),
    banner: require( './webkit-theme/modules/banner/theme.banner.config' ),
    bannerNewsletter: require( './webkit-theme/modules/bannerNewsletter/theme.bannerNewsletter.config' ),
    base: require( './webkit-theme/base/theme.base.config' ),
    buttons: require( './webkit-theme/base/theme.buttons.config' ),
    contactBanner: require( './webkit-theme/modules/contactBanner/theme.contactBanner.config' ),
    doubleBlock: require( './webkit-theme/modules/doubleBlock/theme.doubleBlock.config' ),
    doubleGrid: require('./webkit-theme/modules/doubleGrid/theme.doubleGrid.config'),
    oneGrid: require('./webkit-theme/modules/oneGrid/theme.oneGrid.config'),
    fontFamily: require( './webkit-theme/base/theme.fontFamily.config' ),
    fonts: require('./webkit-theme/base/theme.fonts.config'),
    footer: require( './webkit-theme/modules/footer/theme.footer.config' ),
    grid: require( './webkit-theme/modules/grid/theme.grid.config' ),
    gallery: require( './webkit-theme/modules/gallery/theme.gallery.config' ),
    header: require( './webkit-theme/modules/header/theme.header.config' ),
    structureOverview: require( './webkit-theme/modules/structureOverview/theme.structureOverview.config' ),
    // Disables Placeholder if header is fixed
    headerDisplayPlaceholder: require( './webkit-theme/modules/header/theme.headerDisplayPlaceholder.config' ),
    heading: require( './webkit-theme/modules/heading/theme.heading.config' ),
    iconList: require('./webkit-theme/modules/iconList/theme.iconList.config'),
    imageBanner: require('./webkit-theme/modules/imageBanner/theme.imageBanner.config'),
    intro: require( './webkit-theme/modules/intro/theme.intro.config' ),
    introAction: require( './webkit-theme/modules/intro/theme.introAction.config' ),
    introSlider: require( './webkit-theme/modules/intro/theme.introSlider.config' ),
    quadBlock: require( './webkit-theme/modules/quadBlock/theme.quadBlock.config' ),
    redactor: require( './webkit-theme/base/theme.redactor.config' ),
    screens: require( './webkit-theme/base/theme.screens.config' ),
    slider: require( './webkit-theme/modules/slider/theme.slider.config' ),
    subfooter: require( './webkit-theme/modules/footer/theme.subfooter.config' ),
    testimonial: require( './webkit-theme/modules/testimonial/theme.testimonial.config' ),
    text: require( './webkit-theme/modules/text/theme.text.config' ),
    textGrid: require('./webkit-theme/modules/textGrid/theme.textGrid.config'),
    video: require( './webkit-theme/modules/video/theme.video.config' ),
    extend: require( './webkit-theme/base/themeExtend.config' ),
  },

  variants: require( './webkit-theme/base/variants.config' ),

  plugins: require( './webkit-theme/base/plugins.config' ),

};

module.exports = CONFIG;
