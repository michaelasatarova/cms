const fonts = require('./../../base/theme.fonts.config');

module.exports = {
  color: 'bg-color2 text-color1',

  //only used in theme 2
  desktopMenu: {
    font: {
      color: 'text-color1',
      size: fonts.f5,
    },
    activeLinkColor: 'text-color3',
    activeUnderline: 'border-b-2 border-color3',

    hoverColor: 'text-color3',
    hoverUnderline: 'border-b-2 border-color3',
  },

  menu: {
    color: 'bg-color3',
    iconSize: 'text-f3',
    iconColor: 'text-color2',
    //breakpoint at which the menu icon should always be visible and the text hidden
    forceIconBreakpoint: 'allScreens',

    socials: {
      font: 'text-f5 text-color2',
      border: 'border-t border-color2',
      contactIconColor: 'text-color2',
      socialIconSize: 'text-f5',
    }
  },

  languageSwitcher: {
    font: 'text-lgSwitcher text-color3',
    currentLanguage: 'text-color5'
  },

  // 'fixed' if the header should always be on the top of the visible area, 'static' if it should scroll with content
  headerFixed: 'fixed',

  font: 'text-f4 text-color2 font-bold',
  activeLinkColor: 'text-color2',
  activeUnderline: 'border-b border-color2',

  hoverColor: 'text-color2',
  hoverUnderline: 'border-b border-color2',

  logoHeight: 'h-10',

  //Use custom icon defined in Plugin Config or use hidden for no Icon
  buttonIcon: 'text-xs m:text-f4m xs:text-f4xs tent mr-05',
  buttonSize: fonts.f5 + ' px-4 py-2',
  forceMobileNav: 'forceNav',
};