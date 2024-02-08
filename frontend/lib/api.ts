import axios from "axios";
// note: update the base url once the backend api is ready

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
