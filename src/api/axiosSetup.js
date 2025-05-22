import axios from "axios";
import { reissueToken } from "./authApi";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reissueToken();

        originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;

        return axios(originalRequest);
      } catch (e) {
        // 재발급 실패 시 로그인 페이지로 이동시키는 예시
        window.location.href = "/auth";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
