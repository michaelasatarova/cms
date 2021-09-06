module.exports = {
  //true for fade in animation -> false no animation
  animationDev: false,
  animationStaging: true,

  //default value is 1 -> 1 * animationDurationMultiplier
  animationDurationMultiplier: 1,

  //0% -> top -> 100% -> bottom
  scrollerPosition: '85%',
  scrollerPositionMobile: '95%',

  //positive value -> fade in from bottom | negative value -> fade in from top
  yStartpoint: 70,
  yEndpoint: 0,

  //positive value -> fade in from right | negative value -> fade in from left
  xStartpoint: 0,
  xEndpoint: 0,

  // play none none reverse -> repeat animation | play none none none -> play animation once
  toggleActions: "play none none reverse",

  //Modules to not animate => Array with classnames  ex. ['webkit-slideshow-container', 'webkit-grid-container']
  modulesToNotAnimate: ['first-el'],

  //For Debugging 
  activateMarkers: false,
};