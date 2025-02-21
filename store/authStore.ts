import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
	isAuthenticated: boolean;
	uid: string | null;
	login: (uid: string) => void;
	logout: () => void;
}

const useAuthStore = create(
	persist<AuthStore>(
		set => ({
			isAuthenticated: false,
			uid: null,
			login: (uid: string) => set({ isAuthenticated: true, uid }),
			logout: () => set({ isAuthenticated: false, uid: null }),
		}),
		{
			name: "auth-store",
		}
	)
)

export default useAuthStore