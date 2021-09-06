const fonts = require('../../base/theme.fonts.config');

module.exports = {
  color: 'bg-color2',

  // not used in 1. / 3. theme -> fixed to pt-0,
  imageAspect: 'pt-4/3',
  textBlock: {
    title: {
      color: 'text-color3',
      fontSize: fonts.f5,
    },

    text: {
      color: 'text-color1',
      fontSize: fonts.f2,
    },
  },
};