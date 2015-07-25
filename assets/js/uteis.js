
define('loadCss', function() {
  return function loadCss(url, callback) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'saci';
    link.href = url;
    link.onload = callback;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
});


var $window = $( window );
var $html = $( "html:first" );
var $head = $( "head:first" );
var $body = $( "body:first" );
var $DOC = $( document );

var IS_LOCAL = ( location.host.indexOf( 'localhost' ) !== - 1 );


String.prototype.toInt = function (){
  return parseInt( this );
};

String.prototype.toFloat = function (){
  return parseFloat( this );
};

Number.prototype.isEven = function (){
  return ( this % 2 === 0 );
};

Number.prototype.isOdd = function (){
  return ( this % 2 !== 0 );
};

var Teclas = ( function (){
  return {
    ENTER : 13,
    ESC : 27,
    BACKSPACE : 8,
    TAB : 9,
    SHIFT : 16,
    CTRL : 17,
    ALT : 18,
    SPACE : 32,
    PAUSE : 19,
    PAGE_UP : 33,
    PAGE_DOWN : 34,
    END : 35,
    HOME : 36,
    LEFT : 37,
    UP : 38,
    RIGHT : 39,
    DOWN : 40,
    INSERT : 45,
    DELETE : 46,
    F1 : 112,
    F2 : 113,
    F3 : 114,
    F4 : 115,
    F5 : 116,
    F6 : 117,
    F7 : 118,
    F8 : 119,
    F9 : 120,
    F10 : 121,
    F11 : 122,
    F12 : 123,
    PONTO_E : 190,
    PONTO_D : 110,
    VIRGULA_E : 188,
    VIRGULA_D : 0
  };
} )();


function getRandomInt( max, min ) {
  if( ! min ) min = 0;
  max ++;//needed, because randow will never touch the max number
  return Math.floor( Math.random() * ( max - min ) ) + min;
}
