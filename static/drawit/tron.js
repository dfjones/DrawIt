(function() {
  var Tron;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Tron = (function() {
    Tron.prototype.timeout = 30;
    Tron.prototype.speed = 3;
    Tron.prototype.length = 60;
    Tron.prototype.colors = {
      human: "blue",
      cpu: "red"
    };
    Tron.prototype.clear_color = "rgba(255,255,255,1)";
    Tron.prototype.getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    function Tron(params) {
      this.onKeydown = __bind(this.onKeydown, this);;
      this.cpuMove = __bind(this.cpuMove, this);;
      this.nextCoord = __bind(this.nextCoord, this);;
      this.animate = __bind(this.animate, this);;      this.position = [params.x, params.y];
      this.direction = 90;
      this.trail = [[params.x, params.y]];
      this.board = params.board;
      if (params.human) {
        params.document.keydown(this.onKeydown);
        this.color = this.colors.human;
        setInterval(this.animate, this.timeout);
      } else {
        this.color = this.colors.cpu;
        window.setInterval(this.cpuMove, this.timeout);
      }
    }
    Tron.prototype.animate = function() {
      var end, points, x, y, _ref;
      _ref = this.nextCoord(), x = _ref[0], y = _ref[1];
      this.trail.push([x, y]);
      if (this.trail.length >= this.length) {
        end = this.trail.shift();
        points = [end[0], end[1], this.trail[0][0], this.trail[0][1]];
        this.board.drawLine([points], this.clear_color);
        this.board.broadcast([points], this.clear_color);
      }
      points = [this.position[0], this.position[1], x, y];
      this.board.drawLine([points], this.color);
      this.board.broadcast([points], this.color);
      return this.position = [x, y];
    };
    Tron.prototype.nextCoord = function() {
      var x, y;
      x = this.position[0];
      y = this.position[1];
      if (this.direction === 90) {
        x += this.speed;
      }
      if (this.direction === 270) {
        x -= this.speed;
      }
      if (this.direction === 180) {
        y += this.speed;
      }
      if (this.direction === 0) {
        y -= this.speed;
      }
      return [x, y];
    };
    Tron.prototype.cpuMove = function() {
      var a, b, ctx, data, g, nx, ny, offset, r, rand, _ref;
      ctx = this.board.ctx;
      _ref = this.nextCoord(), nx = _ref[0], ny = _ref[1];
      data = ctx.getImageData(0, 0, 800, 800);
      offset = (ny * 800 + nx) * 4;
      r = data.data[offset];
      g = data.data[offset + 1];
      b = data.data[offset + 2];
      a = data.data[offset + 3];
      if (r !== 0 || g !== 0 || b !== 0 || a !== 0) {
        rand = this.getRandomInt(0, 1);
        if (rand === 1) {
          this.direction = (this.direction + 90) % 360;
        } else {
          this.direction -= 90;
        }
        if (this.direction < 0) {
          this.direction = 360 + this.direction;
        }
      }
      return this.animate();
    };
    Tron.prototype.onKeydown = function(e) {
      switch (e.keyCode) {
        case 38:
          this.direction = 0;
          break;
        case 39:
          this.direction = 90;
          break;
        case 40:
          this.direction = 180;
          break;
        case 37:
          this.direction = 270;
      }
      return e.preventDefault();
    };
    return Tron;
  })();
  window.Tron = Tron;
}).call(this);
