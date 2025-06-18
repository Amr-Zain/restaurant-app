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
      const storeCookie = serverCookies.get("store")?.value;
      const userCookie = serverCookies.get('user')?.value;
      //const locationCookie = serverCookies.get('location')?.value;

      config.params = config.params || {};

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        const guestToken = serverCookies.get('guest_token')?.value;
        if (guestToken) {
          config.params.guest_token = guestToken;
        }
       /*  if(locationCookie){
          const locaiton = JSON.parse(locationCookie);
          config.params.lat = locaiton.lat;
          config.params.lng = locaiton.lng;
        } */
      }

      if (storeCookie) {
        try {
          const store = JSON.parse(storeCookie);
          if (store && store.id) {
            config.params.store_id = store.id;
          }
        } catch (parseError) {
          console.warn("Failed to parse 'store' cookie:", parseError);
        }
      }

      if (userCookie) {
        try {
          const user = JSON.parse(userCookie) as User;
          if (user && user.default_address && user.default_address.id) {
            config.params.address_id = user.default_address.id;
          }
        } catch (parseError) {
          console.warn("Failed to parse 'user' cookie:", parseError);
        }
      }

      config.headers["Accept-Language"] = locale;

    } catch (error) {
      console.error("Error in Axios request interceptor:", error);
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

      (await cookies()).delete('token');
      (await cookies()).delete('user');
      (await cookies()).delete('guest_token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
