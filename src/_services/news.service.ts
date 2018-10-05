import axios from 'axios'

const getLatest = (payload) => request.get('/users', payload);

const axiosInstance = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com",
    responseType: 'json',
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    // },
    // crossdomain: true
});

const request = {
    get: (url, params) => (axiosInstance.get(url, { params: params })),
}



export const newsService = {
    getLatest,
};

