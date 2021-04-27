const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const port = 8080;
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

io.on('connection', socket=>{
  console.log( `${socket.id} connected`);
  socket.on('disconnect', ()=>{
    console.log('user disconnected')
  });

  // emit player 1 name to everyone
  socket.on('p1Name', name=>{
    io.emit('p1Name', name);
  });

  // emit player 2 name to everyone
  socket.on('p2Name', name=>{
    io.emit('p2Name', name);
  });

  // emit player 1 ready
  socket.on('p1Ready', ready=>{
    console.log(`p1 is ${ready}`)
    io.emit('p1Ready', ready);
  });
  // emit player 2 ready
  socket.on('p2Ready', ready=>{
    console.log(`p2 is ${ready}`)
    io.emit('p2Ready', ready);
  });

  // emit start game
  socket.on('start', start=>{
    console.log(`start game!`)
    io.emit('start', start);
  });

  // emit player 1 position
  socket.on('p1Dir', dir=>{
    io.emit('p1Dir', dir);
  });
  // emit player 2 position
  socket.on('p2Dir', dir=>{
    io.emit('p2Dir', dir);
  });
  // emit food location
});


server.listen(port, () => {
  console.log(`Snake running on ${port}`)
})