export const handleConnection = (socket: SocketIO.Socket) => {
  const room = socket.handshake['query']['r_var'];
  socket.join(room);

  socket.on('drawing', (data: any) => {
    socket.broadcast.to(room).emit('drawing', data)
  });
}