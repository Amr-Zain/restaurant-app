// lib/axios.ts
import axios from 'axios';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'os': 'web',
        }
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {




        // Check if request is server-side or client-side


        const serverCookies = await cookies();
        const contextlocale = await getLocale();

        const locale = serverCookies.get('NEXT_LOCALE')?.value || 'en';

        config.headers['Accept-Language'] = contextlocale || locale;

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
    async (error) => {
        if (error.response && error.response.status === 401) {
            const appCookies = await cookies()

            const locale = appCookies.get('NEXT_LOCALE');
            redirect(locale?.value === 'ar' ? '/ar/auth/login' : '/auth/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
