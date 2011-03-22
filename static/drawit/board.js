(function() {
  var Board;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Board = (function() {
    function Board(canvas) {
      this.onMouseMove = __bind(this.onMouseMove, this);;
      this.onMouseUp = __bind(this.onMouseUp, this);;
      this.onMouseDown = __bind(this.onMouseDown, this);;
      this.drawLine = __bind(this.drawLine, this);;
      this.addPoints = __bind(this.addPoints, this);;      this.canvas = canvas;
      this.sessionID = null;
      this.userID = null;
      this.points = [];
      this.color = "rgba(255,0,0,3)";
      this.drawPoints = null;
      this.drawing = false;
      this.lastPos = {
        x: -1,
        y: -1
      };
      this.canvas.mousedown(this.onMouseDown);
      this.canvas.mouseup(this.onMouseUp);
      this.canvas.mousemove(this.onMouseMove);
    }
    Board.prototype.addPoints = function(x1, y1, x2, y2) {
      return this.points.push([x1, y1, x2, y2]);
    };
    Board.prototype.drawLine = function(points, color) {
      var ctx, p, _i, _len, _results;
      ctx = this.canvas[0].getContext("2d");
      ctx.strokeStyle = color;
      ctx.lineWidth = 4.0;
      _results = [];
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        p = points[_i];
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(p[2], p[3]);
        ctx.closePath();
        _results.push(ctx.stroke());
      }
      return _results;
    };
    Board.prototype.onMouseDown = function(e) {
      this.drawing = true;
      return this.lastPos = [e.offsetX, e.offsetY];
    };
    Board.prototype.onMouseUp = function(e) {
      return this.drawing = false;
    };
    Board.prototype.onMouseMove = function(e) {
      if (this.drawing) {
        console.log("x: " + e.offsetX + " y: " + e.offsetY);
        this.addPoints(this.lastPos[0], this.lastPos[1], e.offsetX, e.offsetY);
        this.drawLine(this.points, "black");
        return this.lastPos = [e.offsetX, e.offsetY];
      }
    };
    return Board;
  })();
  window.Board = Board;
}).call(this);
