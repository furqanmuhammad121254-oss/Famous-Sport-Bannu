import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.ONLINE_API_URL,
  withCredentials: true,
});

export default api;
