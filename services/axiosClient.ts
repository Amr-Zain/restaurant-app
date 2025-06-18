import { useAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { headers } = config;

    const locale = Cookies.get("NEXT_LOCALE") || "en";
    const token = Cookies.get("token");
    const store = Cookies.get("store");
    headers["Accept-Language"] = locale;
    headers["os"] = "web";
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      const defaultAddressId = useAuthStore.getState().user?.default_address?.id;
      if (defaultAddressId) {
        config.params = { ...config.params/* , address_id: defaultAddressId  */};
      }
    }
    else {
      config.params = { ...config.params, guest_token: Cookies.get('guest_token') }
    }
    if (store) {
      config.params = { ...config.params, store_id: JSON.parse(store).id }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("🚀 ~ error:", error)
      Cookies.remove("token");
      useAuthStore.getState().clearUser();
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
