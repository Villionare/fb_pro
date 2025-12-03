import axios from "axios";

const server = axios.create({
    baseURL: 'https://fb-backend-22eh.onrender.com/api/',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    allowAbsoluteUrls: false,
    withCredentials: true
});

export default server;