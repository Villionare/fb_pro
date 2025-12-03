import axios from "axios";

const server = axios.create({
    baseURL: 'http://localhost:9999/api/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    },
    allowAbsoluteUrls: false,
    withCredentials: true
});

export default server;