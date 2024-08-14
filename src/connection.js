import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://back-quiz.up.railway.app'
    baseURL: 'http://localhost:3333'
});

export default api;