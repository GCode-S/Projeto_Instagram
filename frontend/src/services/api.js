import axios from 'axios';

const api = axios.create({
    baseURL: 'http://seuIp:3333',
});

export default api;
