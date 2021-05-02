var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
var onlineUsers = [];
io.on('connection', socket => {
  socket.on('message', function (msg) {
    io.to(`${socketId}`).emit('message', msg); //Message to specific user
  });
  console.log(`A user connected with socket id ${socket.id}`)
  socket.broadcast.emit('userconnected', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', socket.id)
  })
  socket.on('event_attend', (data) => {
    socket.broadcast.emit('event_attends', data)
  })

  socket.on('sendMessage', data => {
    console.log(`received ${data.socketId}`)
    socket.broadcast.to(data.socketId).emit('receivedMessage', data)
  })
  // socket.broadcast.emit('customEmit', socket.id);
  socket.on('login', data => {
    socket.broadcast.emit('logins', data)
  })
  socket.on('out', data => {
    socket.broadcast.emit('outs', data)
  })
  socket.on('encodeMembers', data => {
    socket.broadcast.emit('encodeMembers', data)
  })
  socket.on('sendEntered', data => {
    console.log(`${data.socketId}`)
    socket.broadcast.emit('receivedEntered', data)
  })
})
http.listen(3000, () => {
  console.log('Listening on *:3000')
})