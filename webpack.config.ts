import glob from 'glob';
import { join, resolve } from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import { Configuration } from 'webpack';
import { WebpackBaseConfig, WebpackConfigEnv, WebpackConfigParams } from './lib/webpack.base.config';

/*
 * Webpack configuration in TypeScript
 * More information: https://webpack.js.org/configuration/configuration-languages/#typescript
 */

export default ( params: WebpackConfigParams ): Configuration => {
  const rootFolder = resolve( __dirname, '' );
  const srcFolder = `${rootFolder}/src`;
  const outFolder = `${rootFolder}/web`;
  const templatesGlobs: Array<string> = [
    ...glob.sync( join( __dirname, 'vendor/binaryone/craft-webkit/src/templates/**/*' ), { nodir: true } ),
    ...glob.sync( join( __dirname, 'vendor/binaryone/craft-webkit/src/ts/**/*.vue' ), { nodir: true } ),
    ...glob.sync( join( __dirname, 'templates/**/*' ), { nodir: true } ),
    ...glob.sync( join( __dirname, 'src/ts/**/*.vue' ), { nodir: true } )
  ];
  const purgeCssOpts = {
    safelist: {
      // standard: [
      //   'has-overlay', 'overlay-show',
      //   'hidden-to-visible', 'visible-to-hidden',
      // ],
      deep: [
        /^agile/, // necessary to add Vue-Agile styles from node_modules
        /^((xl|l|m|s|xs):)?(col|row|hidden|block)/,
        /^(\*|blockquote|dl|dd|h1|h2|h3|h4|h5|h6|hr|figure|p|pre)/,
        /^overlay/,
        /^lb/,
        /^lightbox/,
        /^slick/,
        /^py/,
        /^pb/,
        /^visible/,
        /^invisible/,
        /^bg/,
      ]
    }
  };

  // load build environment from Webpack console parameters
  const configEnv = WebpackConfigEnv( params, rootFolder );

  // define polyfills etc.
  const ecmaTargetDepFiles = configEnv.ecmaTarget === 'es5' ? [ `${srcFolder}/ts/polyfills-es5.ts` ] : [];

  // load base config object
  const config = WebpackBaseConfig( configEnv, templatesGlobs, purgeCssOpts );

  // app entry points
  config.entry = {
    site: [
      ...ecmaTargetDepFiles,
      `${srcFolder}/ts/index.ts`,
      'tailwindcss/base.css',
      'tailwindcss/components.css',
      `${srcFolder}/scss/index.scss`,
      'tailwindcss/utilities.css',
    ]
  };

  if ( !config.resolve ) {
    config.resolve = {};
  }
  if ( !config.resolve.extensions ) {
    config.resolve.extensions = [];
  }
  config.resolve.extensions.push( '.vue' );

  if ( !config.resolve.alias ) {
    config.resolve.alias = {};
  }

  ( config.resolve.alias as any )[ 'vue$' ] = 'vue/dist/vue.esm.js';
  ( config.resolve.alias as any )[ '@webkit' ] = resolve( __dirname, 'vendor/binaryone/craft-webkit/src' );
  ( config.resolve.alias as any )[ 'theme' ] = resolve( __dirname, 'webkit-theme' );

  config.externals = {
    jquery: 'jQuery',
    'slick-carousel': 'slick-carousel'
  };
  if ( !config.output ) {
    config.output = {};
  }
  config.output.path = outFolder;

  if ( !config.module ) {
    config.module = { rules: [] };
  }
  if ( !Array.isArray( config.module.rules ) ) {
    config.module.rules = [];
  } else if ( config.module.rules.length === 0 ) {
    config.module.rules.push( { options: {} } );
  }
  ( config.module.rules[ 0 ] as any ).options[ 'appendTsSuffixTo' ] = [ /\.vue$/ ];
  // add vue loader
  config.module.rules.push(
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  );

  if ( !config.plugins ) {
    config.plugins = [];
  }
  config.plugins.push(
    new VueLoaderPlugin() as any
  );
  // console.log( config );

  // return Webpack config
  return config;
};
