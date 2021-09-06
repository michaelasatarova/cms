const plugin = require('tailwindcss/plugin');
const config = require('./themeExtend.config');

module.exports = [
  plugin(function ({ addComponents }) {
    // use with "@apply arrowRight" or just give the element an icon class
    const icons = {
      '.arrowRight': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 400,
        content: '"\\f178"',
      },
      '.arrowDown': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 500,
        content: '"\\f063"',
      },
      '.plus': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 300,
        content: '"\\f175"',
      },
      '.minus': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 300,
        content: '"\\f176"',
      },
      '.angleRight': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 400,
        content: '"\\f105"',
      },
      '.angleDown': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 400,
        content: '"\\f107"',
      },
      '.angleUp': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 400,
        content: '"\\f106"',
      },
      '.tent': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 900,
        content: '"\\f6bb"',
      },
      '.play-button': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 300,
        content: '"\\f144"',
      },
      '.download': {
        fontFamily: '"Font Awesome 5 Pro"',
        fontWeight: 400,
        content: '"\\f33d"',
      },
    }

    const newComponents = {
      ...icons,
    };
    addComponents(newComponents)
  }),
  require('tailwind-caret-color')(),
];