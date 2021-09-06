const fonts = require('./../../base/theme.fonts.config');

const gridColsPerScreen = {
  default: 3,
  xl: 3,
  l: 3,
  m: 3,
  s: 1,
  xs: 1
}

module.exports = {
  backgroundColor: 'bg-none',
  backgroundColorCell: 'bg-transparent',
  headingFont: 'text-f2 m:text-f2m xs:text-f2xs font-bold text-color1',
  loadMore: {
    numberOfItemsToShow: 3,
    numberOfItemsToShowOverview: 50, 
    numberOfItemsIncrement: 50,
  },

  heading: {
    font: 'text-f3 m:text-f2m xs:text-f3xs text-color1 font-bold',
  },

  heading2: {
    font: fonts.f2 + ' text-color1',
  },

  text: {
    font: fonts.f5n + ' text-color1',
  },

  // not used in 1. theme -> fixed to pt-1/1,
  aspectRatio: 'pt-4/3 m:pt-4/3 xs:pt-3/2',

  // The number of columns to display in different screen sizes
  colsPerScreen: gridColsPerScreen,
  cols: `grid-cols-${gridColsPerScreen.default}
         xl:grid-cols-${gridColsPerScreen.xl}
         l:grid-cols-${gridColsPerScreen.l}
         m:grid-cols-${gridColsPerScreen.m}
         s:grid-cols-${gridColsPerScreen.s}
         xs:grid-cols-${gridColsPerScreen.xs}`,
};