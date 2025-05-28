import axios from "axios";
import { cookies } from "next/headers";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const serverCookies = await cookies();
      const locale = serverCookies.get("NEXT_LOCALE")?.value || "en";


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
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
