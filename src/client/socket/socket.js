import { io } from "socket.io-client";
import appConstants from "../constants/app.constants";

const socket = io('');

socket.on('connect', () => console.log('Socket connected...'));

socket.on('disconnect', () => console.log('Socket disconnected...'));

socket.on('connect_error', (err) => {
    console.log('Socket connection error...', err.message);
    setTimeout(() => socket.connect(), appConstants.SOCKET_RECONNECT_TIMEOUT);
});

export default socket;