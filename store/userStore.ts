import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Address {
	street?: string;
	city?: string;
	state?: string;
	zipCode: string;
	country: string;
}

interface CartItem {
	productId: string;
	quantity: number;
}

interface UserStoreState {
	_id: string;
	name: string;
	email: string;
	phone: string;
	profilePic: string;
	role: "user" | "admin";
	address?: Address;
	wishlist: string[];
	cart: CartItem[];
	searchHistory: string[];
	orders: string[];
	setUser: (user: Partial<UserStoreState>) => void;
	clearUser: () => void;
	updateAddress: (address: Address) => void;
	addToWishlist: (productId: string) => void;
	removeFromWishlist: (productId: string) => void;
	addToCart: (productId: string, quantity: number) => void;
	reduceFromCart: (productId: string) => void;
	removeFromCart: (productId: string) => void;
	clearCart: () => void;
	addToSearchHistory: (searchTerm: string) => void;
	clearSearchHistory: () => void;
	addToOrders: (orderId: string) => void;
	removeFromOrders: (orderId: string) => void;
	clearOrders: () => void;
}

const useUserStore = create(
	persist<UserStoreState>(
		(set) => ({
			_id: "",
			name: "",
			email: "",
			phone: "",
			profilePic: "",
			role: "user",
			address: undefined,
			wishlist: [],
			cart: [],
			searchHistory: [],
			orders: [],

			setUser: (user) =>
				set((state) => ({
					...state,
					...Object.fromEntries(
						Object.entries(user).filter(([_, v]) => v !== undefined)
					),
				})),

			clearUser: () =>
				set(() => ({
					_id: "",
					name: "",
					email: "",
					phone: "",
					profilePic: "",
					role: "user",
					address: undefined,
					wishlist: [],
					cart: [],
					searchHistory: [],
					orders: [],
				})),

			updateAddress: (address) => set((state) => ({ ...state, address })),

			addToWishlist: (productId) =>
				set((state) => ({
					wishlist: state.wishlist.includes(productId)
						? state.wishlist
						: [...state.wishlist, productId],
				})),

			removeFromWishlist: (productId) =>
				set((state) => ({
					wishlist: state.wishlist.filter((id) => id !== productId),
				})),

			addToCart: (productId, quantity) =>
				set((state) => {
					const existingItem = state.cart.find((item) => item.productId === productId);
					if (existingItem) {
						return {
							cart: state.cart.map((item) =>
								item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
							),
						};
					} else {
						return {
							cart: [...state.cart, { productId, quantity }],
						};
					}
				}),

			reduceFromCart: (productId) =>
				set((state) => {
					const existingItem = state.cart.find((item) => item.productId === productId);
					if (existingItem) {
						return {
							cart: state.cart.map((item) =>
								item.productId === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
							)
								.filter((item) => item.quantity > 0),
						};
					}
					return { cart: state.cart };
				}),

			removeFromCart: (productId) =>
				set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) })),

			clearCart: () => set(() => ({ cart: [] })),

			addToSearchHistory: (searchTerm) =>
				set((state) => ({
					searchHistory: state.searchHistory.includes(searchTerm)
						? state.searchHistory
						: [...state.searchHistory, searchTerm],
				})),

			clearSearchHistory: () => set(() => ({ searchHistory: [] })),

			addToOrders: (orderId) => set((state) => ({ orders: [...state.orders, orderId] })),

			removeFromOrders: (orderId) =>
				set((state) => ({ orders: state.orders.filter((id) => id !== orderId) })),

			clearOrders: () => set(() => ({ orders: [] })),
		}),
		{
			name: "user-store",
		}
	)
);

export default useUserStore;
