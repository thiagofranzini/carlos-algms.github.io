'use strict';

define('$window', ['jquery'], function ($) {
  return $(window);
});

define('$html', ['jquery'], function ($) {
  return $( "html:first" );
});

define('$head', ['jquery'], function ($) {
  return $( "head:first" );
});

define('$body', ['jquery'], function ($) {
  return $( "body:first" );
});

define('$DOC', ['jquery'], function ($) {
  return $( document );
});
