import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001', {
    withCredentials: true,
    transports: ['websocket'], // Gereksiz polling isteklerini önlemek için
});

socket.on('connect', () => {
    console.log('Connected to socket server');
});

socket.on('orderNotification', (order) => {
    console.log('New order received:', order);
});
