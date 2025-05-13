import { Server } from 'socket.io'
let io: Server

export const initSocket = (server: any): Server => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        console.log("A user is connected:", socket.id);

        socket.on('join_chat', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.id} joined chat #{socketId}`);
        });

        socket.on('send_message', (messageData) => {
            io.to(messageData.chatId).emit('reveive_messsaage', messageData);
        });

        socket.on('disconnect', () => {
            console.log('A user is disconnected:', socket.id);
        });
    });

    return io;


}


export const getIO = (): Server => {
    if(!io) {
        throw new Error('Socket.IO not initialized');
    }

    return io;
}