module.exports = {
  sourceMap: true,
  plugins: [
    require( 'postcss-preset-env' ),
    require( 'tailwindcss' ),
    // require( 'autoprefixer' )
    //     'postcss-import': {},
    //     'postcss-preset-env': {},
    //     'cssnano': {}
  ]
};
