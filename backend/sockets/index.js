import { Server } from "socket.io"

const socketMainServer = (serverMain) => {

    //attaching the socket.io server to the http server.
    const io = new Server(serverMain, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST', 'DELETE', 'UPDATE']
        }
    });

    console.log("Socket.io initialised");

    //defining the socket io event handlers.
    io.on("connection", (socket) => {
        console.log(`new client connected: ${socket.id} at ${new Date().toLocaleString()}`);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`new client disconnected: ${socket.id} at ${new Date().toLocaleString()}`);
        });
    });

    return io;
}

export default socketMainServer;