const fonts = require('../../base/theme.fonts.config');

const gridColsPerScreen = {
  default: 3,
  xl: 3,
  l: 3,
  m: 3,
  s: 2,
  xs: 2
}

module.exports = {
  title: fonts.f2 + ' text-color1',

  backgroundColorCell: 'bg-transparent',

  loadMore: {
    numberOfItemsToShow: 9,
    numberOfItemsIncrement: 3,
  },

  sliderOverlay: {
    font: fonts.f5n,
  },

  hoverOverlay: {
    backgroundColor: 'bg-color1 bg-opacity-25',
    text: fonts.f5n + ' text-color2',
    icon: 'text-color2 text-f2 font-medium'
  },

  heading: {
    font: fonts.f5 + ' text-color1',
  },

  // not used in 1. theme -> fixed to pt-1/1,
  aspectRatio: 'pt-1/1',

  // The number of columns to display in different screen sizes
  colsPerScreen: gridColsPerScreen,
  cols: `grid-cols-${gridColsPerScreen.default}
         xl:grid-cols-${gridColsPerScreen.xl}
         l:grid-cols-${gridColsPerScreen.l}
         m:grid-cols-${gridColsPerScreen.m}
         s:grid-cols-${gridColsPerScreen.s}
         xs:grid-cols-${gridColsPerScreen.xs}`,
};