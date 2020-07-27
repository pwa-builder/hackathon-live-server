"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = (socket) => {
    const room = socket.handshake['query']['r_var'];
    socket.join(room);
    socket.on('drawing', (data) => {
        socket.broadcast.to(room).emit('drawing', data);
    });
};
//# sourceMappingURL=socket.js.map