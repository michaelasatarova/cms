/* eslint-disable @typescript-eslint/ban-types */
import { ConstrFn } from '../interfaces/basic.interface';
import { annotate } from './reflection';

export abstract class Injector {
  private static _depTokens: Array<string> = [];
  private static _dependencies: { [ token: string ]: any; } = {};

  public static get( token: string, skipWaring?: boolean ): any {
    if ( 0 <= Injector._depTokens.indexOf( token ) ) {
      return Injector._dependencies[ token ];
    }
    if ( !skipWaring ) {
      console.warn( `No dependency found for token "${token}"` );
    }
    return undefined;
  }

  public static push<T extends object>( instance: ConstrFn<T> ): string {
    // console.log( 'push' );
    // console.log( instance.constructor );
    // console.log( instance.constructor.name );
    const token = Injector.tokenFromClassName( instance.constructor.name, 'Service' );
    if ( token in this._depTokens ) {
      throw new Error( `Failed to register injection token, "${token}" already exists.` );
    }

    // add injection token to constructor prototype
    Object.defineProperty(
      instance.constructor,
      'token',
      {
        configurable: false,
        enumerable: true,
        value: token,
        writable: false
      }
    );

    Injector._depTokens.push( token );
    Injector._dependencies[ token ] = instance;
    return token;
  }

  /**
   * Creates a token name which is the className without nameSuffix
   * and first character is turned into lowercase.
   *
   * @static
   * @param {string} className
   * @param {string} [nameSuffix]
   * @returns {string}
   * @memberof Injector
   */
  public static tokenFromClassName( className: string, nameSuffix?: string ): string {
    if ( typeof nameSuffix !== 'string' ) {
      nameSuffix = '';
    }
    if ( nameSuffix.length ) {
      const iSvc = className.indexOf( nameSuffix );
      if ( 0 <= iSvc ) {
        className = className.substr( 0, iSvc );
      }
    }

    return className.charAt( 0 ).toLowerCase() + className.substr( 1 );
  }

  public static classNameFromToken( token: string, nameSuffix?: string ): string {
    if ( typeof nameSuffix !== 'string' ) {
      nameSuffix = '';
    }
    let className = token.charAt( 0 ).toUpperCase() + token.substr( 1 );
    if ( nameSuffix.length ) {
      const iSvc = token.indexOf( nameSuffix );
      if ( iSvc === -1 ) {
        className = className + nameSuffix;
      }
    }
    return className;
  }

  /**
   * Instantiates a given class and stores the instance.
   *
   * @static
   * @template T
   * @param {T} constrFn
   * @param {boolean} [checkExisting] defaults to false
   * @returns {typeof T} Instance of the given class
   */
  public static instantiateAndPush<T extends ConstrFn<T>>(
    constrFn: T,
    checkExisting?: boolean
  ): typeof T {
    checkExisting = typeof checkExisting === 'boolean' ? checkExisting : false;

    if ( checkExisting ) {
      const existingInst = this.get(
        this.tokenFromClassName( constrFn.name, 'Service' ),
        true
      );
      if ( typeof existingInst !== 'undefined' ) {
        return existingInst;
      }
    }

    // get dependencies to inject into service
    const diArgs = annotate( constrFn );
    // console.log( constrFn.toString() );
    const diDeps = diArgs.map( arg => Injector.get( arg ) );
    const inst = new constrFn( ...diDeps );
    Injector.push( inst );

    return inst;
  }
}
