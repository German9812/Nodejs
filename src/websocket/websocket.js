const { Server } = require('socket.io');

let io;

function initWebSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado por WebSocket:', socket.id);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

function emitEvent(eventName, data) {
  if (io) {
    io.emit(eventName, data);
  }
}

module.exports = {
  initWebSocket,
  emitEvent
};
