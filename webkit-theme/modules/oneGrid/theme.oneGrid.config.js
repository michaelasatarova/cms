const fonts = require('./../../base/theme.fonts.config');

module.exports = {
  // used to set colors and border of the whole module
  blockBorder: 'border-0',
  blockColor: 'bg-color2',
  color: 'bg-color2',
  gapBetweenBlocks: 'gap-8 m:gap-4',

  mainTitle: fonts.f3,

  heading: {
    font: fonts.f3 + ' text-color1 font-bold'
  },

  title: {
    font: 'text-f4 text-color1 font-bold'
  },

  text: {
    font: fonts.f5n + ' text-color1'
  },

  /* imageAspectRatio: 'pt-16/10 m:pt-4/3 s:pt-16/9', */
  imageAspectRatio: 'pt-4/3',
}