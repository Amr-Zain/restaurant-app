import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
      "os": "web"
    },
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const serverCookies = await cookies();
      const token = serverCookies.get('token')?.value;
      const locale = serverCookies.get("NEXT_LOCALE")?.value || "en";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      else {
        config.params = { ...config.params, guest_token: serverCookies.get('guest_token')?.value }
      }
      if (!config.params) {
        config.params = {};
      }

      config.headers["Accept-Language"] = locale;
    } catch (error) {
      console.error("Error setting Axios request headers: ", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {

      (await cookies()).delete('token')
      //logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
