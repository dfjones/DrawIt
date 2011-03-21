class Board
  constructor: (canvas) ->
    @canvas = canvas
    @sessionID = null
    @userID = null
    @points = []
    @color = "rgba(255,0,0,3)"
    @drawPoints = null
    @drawing = false
    @lastPos = {x: -1, y: -1}
  

  addPoints: (x1, y1, x2, y2) ->
    @points.push([x1, y1, x2, y2])
  
  drawLine: (points, color) ->
    ctx = @canvas.getContext("2d")
    ctx.strokeStyle = color
    ctx.lineWidth = 4.0

    for p in points
      ctx.beginPath()
      ctx.moveTo(p[0], p[1])
      ctx.lineTo(p[2], p[3])
      ctx.closePath()
      ctx.stroke()


    
