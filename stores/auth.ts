"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import { changeNotificationStatus } from "@/services/ClientApiHandler";
import { toast } from "sonner";

interface AuthStore {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    location: {
        lat: number;
        lng: number;
    };
    setUser: (user: User) => void;
    setNotifiable: () => void;
    setLocation: (location: {
        lat: number;
        lng: number;
    }) => void;
    clearUser: () => void
    updateUserPoints: (points:number) => void
    verify: Verify
    setVerify: (values: Verify) => void;
    clearVerify: () => void;
}
type Verify = { type: 'register' | 'reset' | null; code: string | null; phone: string | null, resetCode: string | null, updated: boolean }

const userCookie = Cookies.get("user") || '';
const locationCookie = Cookies.get("location");
const location = locationCookie ? JSON.parse(locationCookie) : {
    lat: 31.0000,
    lng: 31.0000,
}
const inititals = {
    user: userCookie ? JSON.parse(userCookie) : null,
    token: Cookies.get("token") || null,
    isLoading: false,
    location,
    verify: { type: null, code: null, phone: null, resetCode: null, updated: false }

}

export const useAuthStore = create<AuthStore>((set, get) => ({
    ...inititals,
    setUser: (user) => set(() => {
        Cookies.set('user', JSON.stringify(user), { expires: 30 });
        Cookies.set('token', user.token, { expires: 30 });
        Cookies.remove('guest_token');
        return ({ user, token: user.token })
    }),
    updateUserPoints: (points: number) => {
        const currentUser = get().user;
        if (currentUser) { 
            get().setUser({ ...currentUser, points });
        } else {
            console.warn("Attempted to update points for a null user.");
        }
    },
    setLocation: (location: {
        lat: number;
        lng: number;
    }) => {
        Cookies.set('location', JSON.stringify(location), { expires: 30 });
        set({ location })
    },
    setNotifiable: async () => {
        set({ isLoading: true })
        try {
            const res = await changeNotificationStatus();
            Cookies.set('user', JSON.stringify({ ...get().user, notifiable: res.data.notifiable }), { expires: 30 });
            toast.success(res.message)
            return set({ user: { ...get().user as User, notifiable: res.data.notifiable }, isLoading: false })
        } catch (err: unknown) {
            toast.success(err instanceof Error ? err.message : 'Error Changing the Notification Status')
            return set({ isLoading: false })
        }
    },
    clearUser: () => set(() => {
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('guest_token');
        return ({ user: null, token: null })
    }),
    setVerify: (verify: Verify) => set(() => ({ verify })),
    clearVerify: () => set(() => ({ verify: { type: null, code: null, phone: null, resetCode: null, updated: false } }))

}));