import axios from "axios";

export default axios.create({
    // baseURL: 'http://192.168.1.10:5000/',
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})