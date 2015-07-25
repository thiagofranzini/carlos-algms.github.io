'use strict';

define('loadCss', function() {
  var head = document.getElementsByTagName('head')[0];
  return loadCss;

  ///////////////////

  function loadCss(url, callback) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'saci';
    link.href = url;
    link.onload = callback;
    head.appendChild(link);
  }
});
