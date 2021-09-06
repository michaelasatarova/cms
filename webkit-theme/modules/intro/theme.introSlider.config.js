const fonts = require('../../base/theme.fonts.config');

module.exports = {
  backgroundImageAspect: 'pt-9/24 xl:pt-10/24 l:pt-2/1 s:pt-16/9',
  boxBgColor: 'bg-color2',

  heading: {
    font: fonts.f1 + ' text-color1',
  },
  text: {
    font: fonts.f4 + ' text-color1',
  },

  arrowColor: 'text-color2',

  autoplay: true,
  autoplaySpeed: 3500, //in ms
  fade: true,
  speed: 2000,
  timing: 'ease'
}