import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
    }
}));

export default useAuthStore;