class Tron
  
  timeout: 30
  speed: 3
  length: 60
  colors: {
    human: "blue",
    cpu: "red"
  }
  clear_color: "rgba(255,255,255,1)"

  getRandomInt: (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

  constructor: (params) ->
    @position = [params.x, params.y]
    @direction = 90
    @trail = [[params.x, params.y]]
    @board = params.board

    if params.human
      params.document.keydown(@onKeydown)
      @color = @colors.human
      setInterval(@animate, @timeout)
    else
      @color = @colors.cpu
      window.setInterval(@cpuMove, @timeout)

  animate: () =>
    [x,y] = @nextCoord()
    @trail.push [x,y]
    if @trail.length >= @length
      end = @trail.shift()
      points = [end[0], end[1], @trail[0][0], @trail[0][1]]
      @board.drawLine([points], @clear_color)
      @board.broadcast([points], @clear_color)
    points = [@position[0], @position[1], x, y]
    @board.drawLine([points], @color)
    @board.broadcast([points], @color)
    @position = [x,y]

  nextCoord: () =>
    x = @position[0]
    y = @position[1]
    x += @speed if @direction is 90
    x -= @speed if @direction is 270
    y += @speed if @direction is 180
    y -= @speed if @direction is 0
    return [x, y]

  cpuMove: () =>
    ctx = @board.ctx
    [nx,ny] = @nextCoord()
    # really dumb logic to figure out what direction to move
    data = ctx.getImageData(0, 0, 800, 800)
    offset = (ny * 800 + nx) * 4
    r = data.data[offset]
    g = data.data[offset+1]
    b = data.data[offset+2]
    a = data.data[offset+3]
    if r isnt 0 || g isnt 0 || b isnt 0 || a isnt 0
      rand = @getRandomInt(0, 1)
      if rand is 1
        @direction = (@direction + 90) % 360
      else
        @direction -= 90

      if @direction < 0
        @direction = 360 + @direction
    @animate()

  onKeydown: (e) =>
    switch e.keyCode
      when 38 then @direction = 0
      when 39 then @direction = 90
      when 40 then @direction = 180
      when 37 then @direction = 270

window.Tron = Tron
