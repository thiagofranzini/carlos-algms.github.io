'use strict';

define('randowInt', function () {
  return getRandomInt;

  ////////////

  function getRandomInt( max, min ) {
    if( ! min ) min = 0;
    max ++;//needed, because randow will never touch the max number
    return Math.floor( Math.random() * ( max - min ) ) + min;
  }
});
