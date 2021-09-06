/* eslint-disable @typescript-eslint/ban-types */
export function annotate( fn: Function ): Array<string> {
  if ( typeof fn !== 'function' ) {
    throw new Error( `Cannot annotate parameter of type "${typeof fn}"` );
  }

  let fnStr = fn.toString();
  let fnOpeningBraceIndex = -1;

  if ( fnStr.indexOf( 'class' ) === 0 ) { // ES6 class
    const constrOffset = fnStr.indexOf( 'constructor(' );
    if ( 0 <= constrOffset ) {
      fnOpeningBraceIndex = constrOffset + 11; // index of '('
    } else {
      return [];
    }
  } else if ( fnStr.indexOf( 'function' ) === 0 ) { // function
    // get part after "function xxx("
    fnOpeningBraceIndex = fnStr.indexOf( '(' );
  } else {
    return [];
  }

  if ( fnOpeningBraceIndex === -1 ) {
    // console.log( 'No function parameters found' );
    return [];
  }
  fnStr = fnStr.substr( fnOpeningBraceIndex + 1 ); // fn string after '('

  // strip everything after the parameters
  const fnClosingBraceIndex = fnStr.indexOf( ')' );
  if ( fnClosingBraceIndex === -1 ) {
    throw new Error( 'Cannot annotate invalid function params end' );
  }
  fnStr = fnStr.substr( 0, fnClosingBraceIndex );

  // get list param names
  const paramNames = fnStr.length > 0 ? fnStr.split( ', ' ) : [];

  // console.log( `after: "${fnStr}"` );
  // console.log( 'Param names found:', paramNames );

  return paramNames;
}
