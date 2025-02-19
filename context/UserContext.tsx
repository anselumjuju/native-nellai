'use client';

import { auth } from '@/lib/firebase';
import { handleRequest } from '@/lib/serverActions';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  _id?: string;
  isLoggedIn?: boolean;
  uid?: string;
  name?: string;
  email?: string | null;
  profilePic?: string;
  phone?: string;
  role?: 'user' | 'admin';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  wishlist?: string[];
  cart?: {
    productId: string;
    quantity: number;
  }[];
  searchHistory?: string[];
  orders?: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user?.isLoggedIn && typeof user.address === 'string') {
      setUser({ ...user, address: JSON.parse(user.address) });
    }
  }, [user]);

  // check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser({ ...user, isLoggedIn: true });
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  // Updates user data when user is logged in
  useEffect(() => {
    (async () => {
      if (user?.isLoggedIn) {
        const { data: users } = await handleRequest({ endpoint: 'users' });
        const userDB = users.find((u: User) => u.uid === auth.currentUser?.uid);
        if (userDB) setUser({ ...user, ...userDB });
      }
    })();
  }, [user?.isLoggedIn]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
