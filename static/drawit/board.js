(function() {
  var Board;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Board = (function() {
    function Board(params) {
      this.broadcast = __bind(this.broadcast, this);;
      this.sendClear = __bind(this.sendClear, this);;
      this.onMessage = __bind(this.onMessage, this);;
      this.onMouseMove = __bind(this.onMouseMove, this);;
      this.clear = __bind(this.clear, this);;
      this.onClear = __bind(this.onClear, this);;
      this.onTouch = __bind(this.onTouch, this);;
      this.onTap = __bind(this.onTap, this);;
      this.onMouseUp = __bind(this.onMouseUp, this);;
      this.onMouseDown = __bind(this.onMouseDown, this);;
      this.drawLine = __bind(this.drawLine, this);;
      this.addPoints = __bind(this.addPoints, this);;      var touch;
      this.canvas = params.canvas;
      this.socket = params.socket;
      this.ctx = this.canvas[0].getContext("2d");
      this.socket.on('message', this.onMessage);
      this.sessionID = null;
      this.userID = null;
      this.points = [];
      this.color = "rgba(255,0,0,3)";
      this.drawPoints = null;
      this.drawing = false;
      this.lastPos = [-1, -1];
      params.clearButton.click(this.onClear);
      touch = this.canvas.Hoverable();
      touch.bind('tap', this.onTap);
      touch.bind('touchablemove', this.onTouch);
      touch.bind('touchableend', this.onMouseUp);
    }
    Board.prototype.addPoints = function(x1, y1, x2, y2) {
      var plist;
      plist = [x1, y1, x2, y2];
      this.points.push(plist);
      return this.broadcast([plist], "black");
    };
    Board.prototype.drawLine = function(points, color) {
      var p, _i, _len;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 4.0;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        p = points[_i];
        this.ctx.beginPath();
        this.ctx.moveTo(p[0], p[1]);
        this.ctx.lineTo(p[2], p[3]);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      return this.points = [];
    };
    Board.prototype.onMouseDown = function(e) {
      this.drawing = true;
      return this.lastPos = [e.offsetX, e.offsetY];
    };
    Board.prototype.onMouseUp = function(e) {
      return this.drawing = false;
    };
    Board.prototype.onTap = function(e, touch) {
      this.drawing = true;
      return this.lastPos = [touch.startTouch.x, touch.startTouch.y];
    };
    Board.prototype.onTouch = function(e, touch) {
      var x, y;
      if (this.drawing) {
        x = touch.currentTouch.x;
        y = touch.currentTouch.y;
        console.log("x: " + x + " y: " + y);
        this.addPoints(this.lastPos[0], this.lastPos[1], x, y);
        this.drawLine(this.points, "black");
        return this.lastPos = [x, y];
      }
    };
    Board.prototype.onClear = function(e) {
      this.clear();
      return this.sendClear();
    };
    Board.prototype.clear = function() {
      return this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
    };
    Board.prototype.onMouseMove = function(e) {
      if (this.drawing) {
        console.log("x: " + e.offsetX + " y: " + e.offsetY);
        this.addPoints(this.lastPos[0], this.lastPos[1], e.offsetX, e.offsetY);
        this.drawLine(this.points, "black");
        return this.lastPos = [e.offsetX, e.offsetY];
      }
    };
    Board.prototype.onMessage = function(message) {
      console.log(message);
      if (message.data && message.data.points) {
        return this.drawLine(message.data.points, message.data.color);
      } else if (message.data && message.data.clear) {
        return this.clear();
      }
    };
    Board.prototype.sendClear = function() {
      var msg;
      msg = {
        clear: true
      };
      return this.socket.send(msg);
    };
    Board.prototype.broadcast = function(pointList, color) {
      var msg;
      msg = {
        points: pointList,
        color: color
      };
      return this.socket.send(msg);
    };
    return Board;
  })();
  window.Board = Board;
}).call(this);
