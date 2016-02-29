'use strict';

/*
 * This file is only responsable to draw into canvas.
 * Does not have any code that use saveAs();
 */

require(['jquery'], canvasDraw);

function canvasDraw($) {
  var $canvas = $('#canvas');
  var canvas = $canvas[0];

  var canvasClearButton = $('#canvas-clear')[0];
  var ctx = canvas.getContext('2d');

  var drawing = false;
  var canvasPoints = {
    x: [],
    y: [],
    drag: []
  };

  canvasClearButton.addEventListener('click', _canvasClear, false);
  canvas.addEventListener('mousedown', _canvasMouseDown, false);
  canvas.addEventListener('mousemove', _canvasMouseMove, false);
  canvas.addEventListener('mouseup', _canvasStopDrawing, false);
  canvas.addEventListener('mouseout', _canvasStopDrawing, false);
  window.addEventListener('unload', _storeCanvas);
  window.addEventListener('resize', _windowResized);

  _resizeCanvas();
  _restoreCanvas();


  /////////////////////////////////


  function _canvasClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasPoints.x.length = 0;
    canvasPoints.y.length = 0;
    canvasPoints.drag.length = 0;
  }

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

  function _canvasStopDrawing() {
    drawing = false;
  }

  function _windowResized() {
    _resizeCanvas();
    draw();
  }

  function _resizeCanvas() {
    canvas.width = $canvas.innerWidth();
    canvas.height = $canvas.innerHeight();
  }

  function addPoint(x, y, dragging) {
    canvasPoints.x.push(x);
    canvasPoints.y.push(y);
    canvasPoints.drag.push(dragging);
  }

  function draw() {
    _resizeCanvas();
    ctx.lineWidth = 6;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2196f3';

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

  function _storeCanvas() {
    sessionStorage.canvasPoints = JSON.stringify(canvasPoints);
  }

  function _restoreCanvas() {
    if( sessionStorage.canvasPoints ) {
      canvasPoints = JSON.parse(sessionStorage.canvasPoints);
    }

    drawing = true;
    setTimeout(draw, 500);
    drawing = false;
  }
}
