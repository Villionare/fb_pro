import { io } from "socket.io-client";

const connectSocket = () => {
    const socket = io('http://localhost:9999/');

    socket.on('connect', () => {
        console.log('Connected to server');
    })

    socket.on('disconnect', (reason) => {
        console.log('disconnected from the server: ', reason);
    });

    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        // Update UI with the message
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });

    socket.on('delay_event', (recieve) => {
        console.log('this is after the delay of 3 sec: ', recieve);
    });

    // Send a message
    socket.emit('custom_wala', 'this is a custom message by duedull');
    socket.emit('outside', 'this is outside');

    return socket;
}

export default connectSocket;