'use strict';

/*
 * This file is only responsable to draw into canvas.
 * Does not have any code that use saveAs();
 */

require(['jquery'], canvasDraw);

function canvasDraw($) {
  var $canvas = $('#canvas');
  var canvas = $canvas[0];
  canvas.width = 500;
  canvas.height = 300;

  var canvasClearButton = $('#canvas-clear')[0];
  var ctx = canvas.getContext('2d');

  var drawing = false;
  var canvasPoints = {
    x: [],
    y: [],
    drag: []
  };

  canvas.addEventListener('mousedown', _canvasMouseDown, false);
  canvas.addEventListener('mousemove', _canvasMouseMove, false);
  canvas.addEventListener('mouseup', _canvasStopDrawing, false);
  canvas.addEventListener('mouseout', _canvasStopDrawing, false);
  canvasClearButton.addEventListener('click', _canvasClear, false);
  window.addEventListener('unload', _storeCanvas);

  _restoreCanvas();


  /////////////////////////////////


  function _canvasMouseDown(event) {
    event.preventDefault();
    drawing = true;
    addPoint(event.offsetX, event.offsetY, false);
    draw();
  }

  function _canvasMouseMove(event) {
    if (drawing) {
      addPoint(event.offsetX, event.offsetY, true);
      draw();
    }
  }


  function _canvasClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasPoints.x.length = 0;
    canvasPoints.y.length = 0;
    canvasPoints.drag.length = 0;
  }

  function addPoint(x, y, dragging) {
    canvasPoints.x.push(x);
    canvasPoints.y.push(y);
    canvasPoints.drag.push(dragging);
  }

  function draw() {
    canvas.width = $canvas.innerWidth();
    ctx.lineWidth = 6;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';

    for(var i = 0, len = canvasPoints.x.length; i < len; i++) {
      ctx.beginPath();
      if (i && canvasPoints.drag[i]) {
        ctx.moveTo(canvasPoints.x[i - 1], canvasPoints.y[i - 1]);
      } else {
        ctx.moveTo(canvasPoints.x[i] - 1, canvasPoints.y[i]);
      }
      ctx.lineTo(canvasPoints.x[i], canvasPoints.y[i]);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function _canvasStopDrawing() {
    drawing = false;
  }

  function _restoreCanvas() {
    if( sessionStorage.canvasPoints ) {
      canvasPoints = JSON.parse(sessionStorage.canvasPoints);
    }

    drawing = true;
    draw();
    drawing = false;
  }

  function _storeCanvas() {
    sessionStorage.canvasPoints = JSON.stringify(canvasPoints);
  }
}
