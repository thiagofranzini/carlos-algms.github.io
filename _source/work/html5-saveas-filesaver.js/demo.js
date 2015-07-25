'use strict';

require(['jquery'], function ($) {
  $(function () {
    var view = window;

    // The canvas drawing portion of the demo is based off the demo at
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
    var document = view.document;
    var session = view.sessionStorage;

    function byId(id) {
      return document.getElementById(id);
    }

    // only get URL when necessary in case Blob.js hasn't defined it yet
    var getBlob = function () {
      return view.Blob;
    };

    var canvas = byId('canvas');
    var canvas_options_form = byId('canvas-options');
    var canvas_filename = byId('canvas-filename');
    var canvas_clear_button = byId('canvas-clear');
    var text = byId('text');
    var text_options_form = byId('text-options');
    var text_filename = byId('text-filename');
    var html = byId('html');
    var html_options_form = byId('html-options');
    var html_filename = byId('html-filename');

    var ctx = canvas.getContext('2d');
    var drawing = false;
    var x_points = session.x_points || [];
    var y_points = session.y_points || [];
    var drag_points = session.drag_points || [];

    var add_point = function (x, y, dragging) {
      x_points.push(x);
      y_points.push(y);
      drag_points.push(dragging);
    };

    var draw = function () {
      //canvas.width = canvas.width;
      ctx.lineWidth = 6;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
      var i = 0;
      var len = x_points.length;

      for (; i < len; i++) {
        ctx.beginPath();
        if (i && drag_points[i]) {
          ctx.moveTo(x_points[i - 1], y_points[i - 1]);
        } else {
          ctx.moveTo(x_points[i] - 1, y_points[i]);
        }
        ctx.lineTo(x_points[i], y_points[i]);
        ctx.closePath();
        ctx.stroke();
      }
    };

    var stop_drawing = function () {
      drawing = false;
    };

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

    canvas.width = 500;
    canvas.height = 300;

    if (typeof x_points === 'string') {
      x_points = JSON.parse(x_points);
    }

    if (typeof y_points === 'string') {
      y_points = JSON.parse(y_points);
    }

    if (typeof drag_points === 'string') {
      drag_points = JSON.parse(drag_points);
    }

    if (session.canvas_filename) {
      canvas_filename.value = session.canvas_filename;
    }

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

    drawing = true;
    draw();
    drawing = false;

    canvas_clear_button.addEventListener('click', function () {
      canvas.width = canvas.width;
      x_points.length = 0;
      y_points.length = 0;
      drag_points.length = 0;
    }, false);

    canvas.addEventListener('mousedown', function (event) {
      event.preventDefault();
      drawing = true;
      console.log(event);
      add_point(event.offsetX, event.offsetY, false);
      draw();
    }, false);

    canvas.addEventListener('mousemove', function (event) {
      if (drawing) {
        add_point(event.offsetX, event.offsetY, true);
        draw();
      }
    }, false);

    canvas.addEventListener('mouseup', stop_drawing, false);
    canvas.addEventListener('mouseout', stop_drawing, false);

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
      session.x_points = JSON.stringify(x_points);
      session.y_points = JSON.stringify(y_points);
      session.drag_points = JSON.stringify(drag_points);
      session.canvas_filename = canvas_filename.value;

      session.text = text.value;
      session.text_filename = text_filename.value;

      session.html = html.innerHTML;
      session.html_filename = html_filename.value;
    }, false);
  });

});
