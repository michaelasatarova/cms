const { f5 } = require('./../../base/theme.fonts.config');
const fonts = require('./../../base/theme.fonts.config');

module.exports = {
  color: 'border-color3 bg-color5',
  headingFont: 'text-color1 font-black text-f5n',
  kontakt: {
    font: fonts.f5n + ' text-color1',
    strong: fonts.f5 + ' text-color1',
    linkFont: 'text-color1 text-f5n font-bold',
    iconFont: 'text-color3 text-f5n font-bold',
  },

  logoHeight: 'h-auto',

  logoText: {
    font: 'text-color1 text-f5n font-light',
  },

  nav: {
    font: 'text-color1 text-f5n font-light minL:hover:text-color3',
    fontExternalLink: 'text-color3 text-f5n font-light',
    activeLink: 'text-color4 text-f5n font-light',
  }
};
