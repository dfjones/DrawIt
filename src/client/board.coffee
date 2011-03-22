class Board

  # canvas should be a jquery node
  constructor: (canvas) ->
    @canvas = canvas
    @sessionID = null
    @userID = null
    @points = []
    @color = "rgba(255,0,0,3)"
    @drawPoints = null
    @drawing = false
    @lastPos = {x: -1, y: -1}
    
    # register events
    @canvas.mousedown(@onMouseDown)
    @canvas.mouseup(@onMouseUp)
    @canvas.mousemove(@onMouseMove)
  

  addPoints: (x1, y1, x2, y2) =>
    @points.push([x1, y1, x2, y2])
  
  drawLine: (points, color) =>
    ctx = @canvas[0].getContext("2d")
    ctx.strokeStyle = color
    ctx.lineWidth = 4.0

    for p in points
      ctx.beginPath()
      ctx.moveTo(p[0], p[1])
      ctx.lineTo(p[2], p[3])
      ctx.closePath()
      ctx.stroke()

  onMouseDown: (e) =>
    @drawing = true
    @lastPos = [e.offsetX, e.offsetY]

  onMouseUp: (e) =>
    @drawing = false

  onMouseMove: (e) =>
    if @drawing
      console.log("x: " + e.offsetX + " y: " + e.offsetY)
      @addPoints(@lastPos[0], @lastPos[1], e.offsetX, e.offsetY)
      @drawLine(@points, "black")
      @lastPos = [e.offsetX, e.offsetY]

# export to window
window.Board = Board
