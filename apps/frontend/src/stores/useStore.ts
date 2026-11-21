import { create } from "zustand";

interface Users{
    id: string,
    email: string,
    username: string,
}


interface AuthStore {
    user: Users | null,
    checking: boolean,
    sessionError: string,
    setUser: (user: Users | null) => void,
    setCheck: (checking: boolean) => void,
    setSessionError: (message: string) => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    checking: true,
    sessionError: "",
    setUser: user => set({ user, sessionError: "" }),
    setCheck: checking => set({ checking }),
    setSessionError: message => set({ sessionError: message }),
}));