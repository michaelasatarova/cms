const fonts = require('./theme.fonts.config');

module.exports = {
  h1: fonts.f1 + ' mt-4 mb-2',
  h2: fonts.f2 + ' mt-4 mb-2',
  h3: fonts.f3 + ' mt-4 mb-2',
  h4: fonts.f4 + ' mt-4 mb-2',
  h5: fonts.f5 + ' mt-4 mb-2',
  list: fonts.f4n + ' text-color3',
  p: fonts.f5n + ' text-color1',
  em: fonts.f4n + ' text-color3',
  strong: fonts.f4 + ' text-color1',
  a: 'text-color1 font-bold',
  aUnderLine: 'text-color3 border-color1',
  paragraphSpacing: 'mt-2',
  bulletPoints: 'bg-color1 rounded-full'
};