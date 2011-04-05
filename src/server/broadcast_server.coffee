http = require 'http'
io = require 'socket.io'

server = http.createServer (req, res) ->
  res.writeHead(200, {"Content-Type": "text/html"})
  res.end("<h1> Broadcast Server </h1>")

server.listen(8000)

socket = io.listen(server)
socket.on 'connection', (client) ->
  client.broadcast({ announcement: client.sessionId + ' connected' })

  client.on 'message', (message) ->
    msg = { data: message }
    client.broadcast(msg)

  client.on 'disconnect', () ->
    client.broadcast({ announcement: client.sessionId + ' disconnected' })
