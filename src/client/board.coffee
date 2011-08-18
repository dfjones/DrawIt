class Board

  # canvas should be a jquery node
  constructor: (params) ->
    @canvas = params.canvas
    @socket = params.socket
    @ctx = @canvas[0].getContext("2d")
    @socket.on 'message', @onMessage
    @sessionID = null
    @userID = null
    @points = []
    @color = "rgba(255,0,0,3)"
    @drawPoints = null
    @drawing = false
    @lastPos = {x: -1, y: -1}
    
    # register events
    #@canvas.mousedown(@onMouseDown)
    #@canvas.mouseup(@onMouseUp)
    #@canvas.mousemove(@onMouseMove)

    touch = @canvas.Touchable()

    touch.bind 'tap', @onMouseDown
    touch.bind 'touchablemove', @onTouch
    touch.bind 'touchableend', @onMouseUp

  

  addPoints: (x1, y1, x2, y2) =>
    plist = [x1, y1, x2, y2]
    @points.push(plist)
    @broadcast([plist], "black")
  
  drawLine: (points, color) =>
    @ctx.strokeStyle = color
    @ctx.lineWidth = 4.0

    for p in points
      @ctx.beginPath()
      @ctx.moveTo(p[0], p[1])
      @ctx.lineTo(p[2], p[3])
      @ctx.closePath()
      @ctx.stroke()

  onMouseDown: (e) =>
    @drawing = true
    @lastPos = [e.offsetX, e.offsetY]

  onMouseUp: (e) =>
    @drawing = false

  onTouch: (e, touch) =>
    if @drawing
      x = touch.currentTouch.x
      y = touch.currentTouch.y
      console.log("x: " + x + " y: " + y)
      @addPoints(@lastPos[0], @lastPos[1], x, y)
      @drawLine(@points, "black")
      @lastPos = [x, y]

  onMouseMove: (e) =>
    if @drawing
      console.log("x: " + e.offsetX + " y: " + e.offsetY)
      @addPoints(@lastPos[0], @lastPos[1], e.offsetX, e.offsetY)
      @drawLine(@points, "black")
      @lastPos = [e.offsetX, e.offsetY]

  onMessage: (message) =>
    console.log message
    if message.data and message.data.points
      @drawLine message.data.points, message.data.color

  broadcast: (pointList, color) =>
    msg = { points: pointList , color: color}
    @socket.send msg

# export to window
window.Board = Board
