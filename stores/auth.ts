"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    clearUser: () => void
}

const inititals = {
    user: JSON.parse(localStorage.getItem('user')!) || null,
    token: localStorage.getItem('token'),
}

export const useAuthStore = create<AuthStore>((set) => ({
    ...inititals,
    setUser: (user) => set(() => {
        Cookies.set('user', JSON.stringify(user),{expires:30 })
        Cookies.set('token', user.token,{expires:30 })
        return ({ user, token: user.token })
    }),
    clearUser: () => set(() => {
        Cookies.remove('token')
        Cookies.remove('user')
        return ({ user: null, token: null })
    })
}));