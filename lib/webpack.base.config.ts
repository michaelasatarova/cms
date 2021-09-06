import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { resolve } from 'path';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { IEnvironment } from './ts/env';

/*
 * Webpack configuration in TypeScript
 * More information: https://webpack.js.org/configuration/configuration-languages/#typescript
 */

export interface WebpackConfigParams {
  ecmaTarget: 'es2015' | 'es5';
  env: 'dev' | 'staging' | 'production';
}

export interface WebpackConfigEnv {
  ecmaTarget: 'es2015' | 'es5';
  env: IEnvironment;
}

export function WebpackConfigEnv( params: WebpackConfigParams, rootFolderPath: string ): WebpackConfigEnv {
  if ( typeof params !== 'object' ) {
    params = {
      env: 'dev',
      ecmaTarget: 'es2015',
    };
  }
  if ( typeof params.ecmaTarget !== 'string' ) {
    params.ecmaTarget = 'es2015'; // default if not defined
  }
  if ( typeof params.env !== 'string' ) {
    params.env = 'dev'; // default if not defined
  }
  if ( params.env !== 'dev' && params.env !== 'staging' && params.env !== 'production' ) {
    throw new Error( 'Please define "--env" with "dev", "staging" or "production"' );
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ENV: IEnvironment = require( `${rootFolderPath}/.env.${params.env}.ts` ).ENVIRONMENT;
  return {
    ecmaTarget: params.ecmaTarget,
    env: ENV
  };
}

export function WebpackBaseConfig( configEnv: WebpackConfigEnv, templatesGlobs?: Array<string>, purgeCssOpts?: { [ key: string ]: any; } ): Configuration {
  const ENV = configEnv.env;

  // -------------------------------------------------------
  // Show loaded env
  console.log( `Loaded environment: /.env.${configEnv.env.name}.ts` );
  console.log( `ECMA target: ${configEnv.ecmaTarget}` );
  console.log( ENV );
  // -------------------------------------------------------

  const config: Configuration = {
    resolve: {
      extensions: [ '.ts', '.js', '.css', '.scss' ],
      modules: [ 'node_modules' ],
      alias: {
        '@libTs': resolve( __dirname, 'ts' ),
      }
    },
    // externals: {
    //   jquery: 'jQuery',
    //   'slick-carousel': 'slick-carousel',
    //   angular: 'angular',
    //   'angular-cookies': 'ngCookies'
    // },
    output: {
      publicPath: ENV.isProduction ? '/' : 'http://localhost:8080/',
      filename: `[name]${ENV.name !== 'dev' ? '.[chunkhash:8]' : ''}-${configEnv.ecmaTarget}.js`,
      chunkFilename: `[name]${ENV.name !== 'dev' ? '.[chunkhash:8]' : ''}-${configEnv.ecmaTarget}.js`,
      crossOriginLoading: 'anonymous',
      libraryTarget: 'umd'
    },
    optimization: {
      minimize: ENV.isProduction,
      minimizer: ENV.isProduction ? [
        new TerserPlugin( {
          test: /\.js(\?.*)?$/i,
          extractComments: false,
          terserOptions: { mangle: false, sourceMap: false }
        } ) as any
      ] : []
    },
    devtool: ENV.isProduction ? false : 'source-map',
    target: configEnv.ecmaTarget === 'es5' ? [ 'web', 'es5' ] as any : 'web',
    mode: ENV.isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.ts$/i,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            compilerOptions: { sourceMap: !ENV.isProduction },
            configFile: `tsconfig${configEnv.ecmaTarget === 'es5' ? '-es5' : ''}.json`
          }
        },
        {
          test: /\.(s[ac]ss)$/i,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                esModule: true,
                hmr: ENV.name === 'dev'
              }
            },
            {
              loader: 'css-loader', options: {
                url: false,
                import: false,
                modules: false,
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ENV.name !== 'dev'
                    ? [
                      [ 'autoprefixer' ]
                    ]
                    : [],
                },
                sourceMap: false,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                esModule: true,
                hmr: ENV.name === 'dev'
              }
            },
            {
              loader: 'css-loader', options: {
                url: false,
                import: false,
                modules: false,
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ENV.name !== 'dev'
                    ? [
                      [ 'autoprefixer' ]
                    ]
                    : [],
                },
                sourceMap: false,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new WebpackManifestPlugin( {
        publicPath: '/',
        fileName: `manifest${configEnv.ecmaTarget === 'es5' ? '-legacy' : ''}.json`
      } ),
      new DefinePlugin( { ENVIRONMENT: JSON.stringify( ENV ) } ),
      new ExtractCssChunks( {
        filename: `[name]${ENV.name !== 'dev' ? '.[contenthash:8]' : ''}.css`,
        chunkFilename: `[name]${ENV.name !== 'dev' ? '.[contenthash:8]' : ''}.css`,
      } ) as any,
      // new MiniCssExtractPlugin( {
      //   filename: `[name]${ENV.name !== 'dev' ? '.[contenthash:8]' : ''}.css`,
      //   chunkFilename: `[name]${ENV.name !== 'dev' ? '.[contenthash:8]' : ''}.css`,
      // } )
    ],
  };
  ( config as any ).devServer = {
    contentBase: [ './templates', './translations', './web' ],
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    hot: true, // HMR
    inline: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8080,
    transportMode: 'ws',
    watchContentBase: true,
    publicPath: 'http://localhost:8080/',
    allowedHosts: [
      'localhost',
      '.local',
      '.nitro',
    ]
  };

  // Additional production-only settings
  if ( ENV.isProduction ) {
    config.plugins?.push(
      new OptimizeCSSAssetsPlugin( {
        cssProcessorOptions: {
          preset: [ 'default', { discardComments: { removeAll: true } } ],
        }
      } ) as any
    );
  }

  templatesGlobs = templatesGlobs || [];
  purgeCssOpts = purgeCssOpts || {};
  if ( ENV.isProduction && Array.isArray( templatesGlobs ) && templatesGlobs.length ) {
    config.plugins?.push(
      new PurgeCSSPlugin( {
        paths: templatesGlobs,
        ...purgeCssOpts
      } )
    );
  }

  return config;
}
