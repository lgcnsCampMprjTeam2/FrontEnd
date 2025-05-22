import axios from "axios";
import { reissueToken } from "./authApi";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry || originalRequest.url?.includes("/auth/reissue")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reissueToken();

        if (originalRequest.headers?.Authorization) {
          originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        }

        return axios(originalRequest);
      } catch (e) {
        
        window.location.href = "/auth";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
