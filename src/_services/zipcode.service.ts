import axios from "axios";

const getStateFromZip = (zip, payload) =>
  request.get(zip + "/degrees", payload);

const axiosInstance = axios.create({
  baseURL:
    "https://www.zipcodeapi.com/rest/js-jCOHVDxqHQzM5RsLhZXqsHe78bJ4lNNPFvhFsdmmABWC3eyaEvDBb4cgbrY1ZrUk/info.json/",
  responseType: "json"
});

const request = {
  get: (url, params) => axiosInstance.get(url, { params: params })
};

export const zipcodeService = {
  getStateFromZip
};
