require(['jquery', 'loadCss', '$html', '$DOC', 'teclas'], function ($, loadCss, $html, $DOC, Teclas) {

  $(function () {
    loadGoogleFonts();
    stylizeCodeblocks();
    handleCssChanges();
  });

  /////

  function loadGoogleFonts() {
    loadCss('http://fonts.googleapis.com/css?family=Raleway:300,400,700', fontLoaded);

    function fontLoaded() {
      $html.addClass('fonts-loaded');
    }
  }


  function stylizeCodeblocks() {
    $('pre code').each( eachCodeBlock );

    function eachCodeBlock( i, block ) {
      hljs.highlightBlock( block );
    }
  }


  function handleCssChanges() {
    var styleElement = $( '#devCss' );
    window.updateCss = updateCss;
    $DOC.keyup(updateCssOnKeyUp);

    if( location.search.indexOf( 'refresh' ) !== - 1 ){
      setInterval( window.updateCss, 1000 );
    }

    function updateCssOnKeyUp( e ){
      if( e.keyCode == Teclas.PAUSE ) {
        updateCss();
      }
    }

    function updateCss() {
      styleElement.attr( 'href', styleElement.attr( 'href' ).replace( /\?*[0-9]*$/, '?' + Date.now() ) );
      console.log( 'update-CSS' );
    }
  }
});

