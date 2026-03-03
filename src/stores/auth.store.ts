import { create } from "zustand";
import { getMyInfoApi, MyRole } from "@/api/auth.api";

type AuthUser = { id: number; name: string; role: MyRole };

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  hydrate: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  hydrate: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      set({ user: null, isLoading: false });
      return;
    }

    try {
      const res = await getMyInfoApi();
      if (res.success && res.data) {
        set({
          user: { id: res.data.id, name: res.data.name, role: res.data.role },
          isLoading: false,
        });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      // 401이면 axios interceptor가 refresh 시도 -> 실패하면 /login으로 보냄
      set({ user: null, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, isLoading: false });
    window.location.href = "/login";
  },
}));
