const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const httpProxy = require('http-proxy');
const io = require("socket.io")(server);

require('dotenv').config();

// serve static file
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.set('port', process.env.PORT);

// var proxy = new httpProxy.createProxyServer({
//   target: {
//     host: 'localhost',
//     port: 3000
//   }
// });
// var proxyServer = http.createServer(function (req, res) {
  // proxy.web(req, res);
// });


// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.

// proxyServer.on('', function (req, socket, head) {
//   proxy.ws(req, socket, head);
// });

// proxyServer.listen(3001)
//   .listen(3001,()=>{
//     console.log(`snake api at ${port}`)
//   });

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
  socket.on('food', pos=>{
    console.log('pos is ' + pos )
    io.emit('food', pos);
  });

  // emit game over
  socket.on('over', over=>{
    io.emit('over', over);
  });

  socket.on('p1Color',color=>{
    io.emit('p1Color',color);
  });

  socket.on('p2Color',color=>{
    io.emit('p2Color',color);
  });

  socket.on('score1', score=>{
    console.log('score 1 ' + score)
    io.emit('score1', score);
  });

  socket.on('score2', score=>{
    console.log('score 2 ' + score)
    io.emit('score2', score);
  });
});


server.listen(app.get('port'), () => {
  console.log(`Snake client running on ${process.env.PORT}`)
})