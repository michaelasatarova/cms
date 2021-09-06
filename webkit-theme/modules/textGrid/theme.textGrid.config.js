const fonts = require('./../../base/theme.fonts.config');

const gridColsPerScreen = {
  default: 3,
  xl: 3,
  l: 3,
  m: 2,
  s: 1,
  xs: 1
}

module.exports = {
  loadMore: {
    numberOfItemsToShow: 3,
    numberOfItemsToShowOverview: 99999,
    numberOfItemsIncrement: 9999,
  },

  color: 'text-color1',
  backgroundColor: 'bg-color2',
  buttonColor: 'bg-color2',
  // Row gap, applied to each element at the bottom
  gapBetweenElementsY: 'mb-4', // only use "mb-X"!

  colsPerScreen: gridColsPerScreen,

  cols: `grid-cols-${gridColsPerScreen.default}
         xl:grid-cols-${gridColsPerScreen.xl}
         l:grid-cols-${gridColsPerScreen.l}
         m:grid-cols-${gridColsPerScreen.m}
         s:grid-cols-${gridColsPerScreen.s}
         xs:grid-cols-${gridColsPerScreen.xs}`,

  mainHeading: 'text-f3 m:text-f2m xs:text-f2xs text-color1 italic font-bold',

  heading: {
    font: fonts.f3 + ' text-color1',
  },

  text: {
    font: fonts.f5n + ' text-color1',
  },

  hover: {
    itemBackgroundColor: 'bg-color5',
    heading: 'text-color1',
    text: 'text-color1',
    button: 'bg-transparent'
  }
};
