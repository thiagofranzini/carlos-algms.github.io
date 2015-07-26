(function () {
  'use strict';

  require(['https://cdn.rawgit.com/carlos-algms/FileSaver.js/master/FileSaver.js'], saveAsDemo);

  //////////////////

  function saveAsDemo(saveAs) {

    /*
     * For exemple purposes, I put the 3 most important functions on top
     * saveCanvas(), savePlainText() and saveHtml() contains all the code you need to use the FileSaver.js
     */

    function saveCanvas(event) {
      event.preventDefault();

      canvasElement.toBlob(function (canvasContentBlob) {
        var fileName = (canvasFilename.value || canvasFilename.placeholder) + '.png';

        saveAs( canvasContentBlob, fileName);

      }, 'image/png');
    }


    function savePlainText(event) {
      event.preventDefault();

      var plainText = [text.value || text.placeholder];

      var Blob = getBlob();
      var plainTextBlob = new Blob( plainText, {type: 'text/plain;charset=' + document.characterSet} );

      var fileName = (textFilename.value || textFilename.placeholder) + '.txt';

      saveAs( plainTextBlob, fileName);

    }


    function saveHtml(event) {
      event.preventDefault();

      var Blob = getBlob();
      var xmlSerializer = new XMLSerializer();
      var doc = createHtmlDoc(html);

      var htmlBlob = new Blob(
        [ xmlSerializer.serializeToString(doc) ],
        { type: 'application/xhtml+xml;charset=' + document.characterSet }
      );

      var fileName = (htmlFilename.value || htmlFilename.placeholder) + '.xhtml';

      saveAs(htmlBlob, fileName);
    }


    /////////// from here, all the code is to make a beautiful page :) ///////////////////


    var docImplementation = document.implementation;

    var canvasElement = byId('canvas');
    var canvasOptionsForm = byId('canvas-options');
    var canvasFilename = byId('canvas-filename');

    var text = byId('text');
    var textOptionsForm = byId('text-options');
    var textFilename = byId('text-filename');
    var html = byId('html');
    var htmlOptionsForm = byId('html-options');
    var htmlFilename = byId('html-filename');


    canvasOptionsForm.addEventListener('submit', saveCanvas, false);
    textOptionsForm.addEventListener('submit', savePlainText, false);
    htmlOptionsForm.addEventListener('submit', saveHtml, false);
    window.addEventListener('unload', storeFormsValues, false);

    restoreFormsValues();


    ////////////////


    function byId(id) {
      return document.getElementById(id);
    }


    /**
     * only get URL when necessary in case Blob.js hasn't defined it yet
     * In case Blob polyfill don't let it public
     */
    function getBlob() {
      return window.Blob;
    }


    function createHtmlDoc(html) {
      var dt = docImplementation.createDocumentType('html', null, null);
      var doc = docImplementation.createDocument('http://www.w3.org/1999/xhtml', 'html', dt);
      var docElement = doc.documentElement;
      var head = docElement.appendChild( doc.createElement('head') );
      var charsetMeta = head.appendChild( doc.createElement('meta') );
      var title = head.appendChild( doc.createElement('title') );
      var body = docElement.appendChild( doc.createElement('body') );
      var i = 0;
      var len = html.childNodes.length;

      charsetMeta.setAttribute('charset', html.ownerDocument.characterSet);

      for (; i < len; i++) {
        body.appendChild(doc.importNode(html.childNodes.item(i), true));
      }

      var title_text = guessTitle(doc);
      if (title_text) {
        title.appendChild(doc.createTextNode(title_text));
      }

      return doc;
    }


    // Title guesser and document creator available at https://gist.github.com/1059648
    function guessTitle(doc) {
      var h = "h6 h5 h4 h3 h2 h1".split(" ");
      var i = h.length;
      var headers;

      while (i--) {
        headers = doc.getElementsByTagName(h[i]);

        for (var j = 0, len = headers.length, headerText; j < len; j++) {
          headerText = headers[j].textContent.trim();
          if (headerText) {
            return headerText;
          }
        }
      }
    }


    function storeFormsValues() {
      sessionStorage.canvasFilename = canvasFilename.value;

      sessionStorage.text = text.value;
      sessionStorage.textFilename = textFilename.value;

      sessionStorage.html = html.innerHTML;
      sessionStorage.html_filename = htmlFilename.value;
    }


    function restoreFormsValues() {
      if (sessionStorage.canvasFilename) {
        canvasFilename.value = sessionStorage.canvasFilename;
      }

      if (sessionStorage.text) {
        text.value = sessionStorage.text;
      }

      if (sessionStorage.textFilename) {
        textFilename.value = sessionStorage.textFilename;
      }

      if (sessionStorage.html) {
        html.innerHTML = sessionStorage.html;
      }

      if (sessionStorage.htmlFilename) {
        htmlFilename.value = sessionStorage.htmlFilename;
      }
    }
  }
})();
