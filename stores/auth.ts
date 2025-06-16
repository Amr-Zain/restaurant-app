"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import { changeNotificationStatus } from "@/services/ClientApiHandler";
import { toast } from "sonner";

interface AuthStore {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setUser: (user: User) => void;
    setNotifiable: () => void;
    clearUser: () => void
}
const userCookie = Cookies.get("user") || '';
const inititals = {
    user: userCookie ? JSON.parse(userCookie) : null,
    token: Cookies.get("token") || null,
    isLoading:false
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    ...inititals,
    setUser: (user) => set(() => {
        Cookies.set('user', JSON.stringify(user), { expires: 30 });
        Cookies.set('token', user.token, { expires: 30 });
        return ({ user, token: user.token })
    }),
    setNotifiable: async () => {
        set({isLoading:true})
        try{
            const res = await changeNotificationStatus();
            Cookies.set('user', JSON.stringify({ ...get().user, notifiable: res.data.notifiable }), { expires: 30 });
            toast.success(res.message)
            return set({ user: { ...get().user as User, notifiable: res.data.notifiable },isLoading:false })
        }catch(err:unknown){
            toast.success(err instanceof Error?err.message:'Error Changing the Notification Status')
            return set({ isLoading:false })
        }
    },
    clearUser: () => set(() => {
        Cookies.remove('token')
        Cookies.remove('user')
        return ({ user: null, token: null })
    })
}));