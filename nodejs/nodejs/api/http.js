const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'content-type': 'multipart/form-data',
        // 'accept': 'multipart/form-data',
        // 'referer':'survtech-axios'
    }  
})

module.exports = { _http:axiosInstance}