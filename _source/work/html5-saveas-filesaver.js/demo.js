'use strict';

require(['jquery'], function ($) {
  $(function () {
    var view = window;

    var document = view.document;
    var session = view.sessionStorage;

    function byId(id) {
      return document.getElementById(id);
    }

    // only get URL when necessary in case Blob.js hasn't defined it yet
    var getBlob = function () {
      return view.Blob;
    };


    var canvas_options_form = byId('canvas-options');
    var canvas_filename = byId('canvas-filename');

    var text = byId('text');
    var text_options_form = byId('text-options');
    var text_filename = byId('text-filename');
    var html = byId('html');
    var html_options_form = byId('html-options');
    var html_filename = byId('html-filename');


    if (sessionStorage.canvasFilename) {
      canvas_filename.value = sessionStorage.canvasFilename;
    }

    // Title guesser and document creator available at https://gist.github.com/1059648
    var guess_title = function (doc) {
      var
        h = "h6 h5 h4 h3 h2 h1".split(" ")
        , i = h.length
        , headers
        , header_text
        ;
      while (i--) {
        headers = doc.getElementsByTagName(h[i]);
        for (var j = 0, len = headers.length; j < len; j++) {
          header_text = headers[j].textContent.trim();
          if (header_text) {
            return header_text;
          }
        }
      }
    };

    var doc_impl = document.implementation;

    var create_html_doc = function (html) {
      var
        dt = doc_impl.createDocumentType('html', null, null)
        , doc = doc_impl.createDocument("http://www.w3.org/1999/xhtml", "html", dt)
        , doc_el = doc.documentElement
        , head = doc_el.appendChild(doc.createElement("head"))
        , charset_meta = head.appendChild(doc.createElement("meta"))
        , title = head.appendChild(doc.createElement("title"))
        , body = doc_el.appendChild(doc.createElement("body"))
        , i = 0
        , len = html.childNodes.length
        ;
      charset_meta.setAttribute("charset", html.ownerDocument.characterSet);
      for (; i < len; i++) {
        body.appendChild(doc.importNode(html.childNodes.item(i), true));
      }
      var title_text = guess_title(doc);
      if (title_text) {
        title.appendChild(doc.createTextNode(title_text));
      }
      return doc;
    };


    if (session.text) {
      text.value = session.text;
    }

    if (session.text_filename) {
      text_filename.value = session.text_filename;
    }

    if (session.html) {
      html.innerHTML = session.html;
    }

    if (session.html_filename) {
      html_filename.value = session.html_filename;
    }



    canvas_options_form.addEventListener('submit', function (event) {
      event.preventDefault();
      canvas.toBlob(function (blob) {
        saveAs(
          blob
          , (canvas_filename.value || canvas_filename.placeholder) + '.png'
        );
      }, 'image/png');
    }, false);

    text_options_form.addEventListener('submit', function (event) {
      event.preventDefault();
      var BB = getBlob();
      saveAs(
        new BB(
          [text.value || text.placeholder]
          , {type: 'text/plain;charset=' + document.characterSet}
        )
        , (text_filename.value || text_filename.placeholder) + '.txt'
      );
    }, false);

    html_options_form.addEventListener('submit', function (event) {
      event.preventDefault();
      var
        BB = getBlob()
        , xml_serializer = new XMLSerializer()
        , doc = create_html_doc(html)
        ;
      saveAs(
        new BB(
          [xml_serializer.serializeToString(doc)]
          , {type: 'application/xhtml+xml;charset=' + document.characterSet}
        )
        , (html_filename.value || html_filename.placeholder) + '.xhtml'
      );
    }, false);

    view.addEventListener('unloads', function () {
      session.canvas_filename = canvas_filename.value;

      session.text = text.value;
      session.text_filename = text_filename.value;

      session.html = html.innerHTML;
      session.html_filename = html_filename.value;
    }, false);
  });

});
