module.exports = function ( theme ) {
  return {
    display: ( theme( 'header.headerFixed' ) == 'fixed' ? 'visible' : 'hidden' ),
  };
};