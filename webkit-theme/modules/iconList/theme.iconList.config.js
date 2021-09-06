const fonts = require('./../../base/theme.fonts.config');

module.exports = {
  /** Icon size is configured with the font sizes in themeExtend.config.js */
  color: 'bg-color5',
  font: fonts.f3 + ' text-color1',
  headingFont: fonts.f2 + ' text-left text-color1',
 /*  iconBackgroundColor: 'bg-color2', */
  iconColor: 'text-color3',  
  iconContainerSize: 'h-10 w-10 xs:h-8 xs:w-8',
  button: 'bg-color1 text-color2 mb-3',

  item: {
    headingFont: fonts.f4 + ' text-color1',
    subtitleFont: fonts.f6 + ' text-color1',
  }
};