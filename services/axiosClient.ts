// lib/axios.ts
"use client"
import { useAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const locale = Cookies.get("NEXT_LOCALE") || "en";
    const token = Cookies.get("token");
    config.headers["Accept-Language"] = locale;
    config.headers["os"] = "web";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("🚀 ~ error:", error)
      Cookies.remove("token");
      //logout();
      useAuthStore.getState().clearUser();
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
