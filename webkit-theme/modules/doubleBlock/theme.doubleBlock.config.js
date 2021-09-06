const fonts = require('./../../base/theme.fonts.config');

module.exports = {
  color: 'bg-color2',

  linkList: {
    borderColor: 'border-color5',
    label: {
      font: fonts.f5n
    },
    title: {
      font: fonts.f3 + ' text-color1',
    },
  },
  // Used for image and video
  media: {
    // not used in 1. theme -> fixed to pt-1/1,
    mediaAspect: 'pt-1/1',
    closeIcon: 'text-color1',

    playButton: 'text-color4 text-iconsLarge',
    playText: fonts.f5 + ' text-color4',
  },

  textBlock: {
    title: {
      font: fonts.f3 + ' text-color1',
    },

    text: {
      font: fonts.f5n + ' text-color1 mt-2 mb-2',
    },
  },
};