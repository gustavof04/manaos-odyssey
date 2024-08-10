import Axios from "axios";
import { envs } from "../common/env-values";

const axios = Axios.create({
  baseURL: envs.API_URL,
});

const api = axios;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
