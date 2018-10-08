import axios from "axios";

const getLatest = payload => request.get("/users", payload);

const axiosInstance = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
  responseType: "json"
});

const request = {
  get: (url, params) => axiosInstance.get(url, { params: params })
};

export const usersService = {
  getLatest
};
