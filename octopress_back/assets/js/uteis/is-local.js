'use strict';

define('isLocal', function isLocalDefine() {
  return location.host.indexOf( '127.0.0.1' ) !== - 1;
});
