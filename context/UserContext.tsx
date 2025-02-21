'use client';

import { auth } from '@/lib/firebase';
import { handleRequest } from '@/lib/serverActions';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      console.log('Auth State Changed', u);
      if (u) {
        const { data: users } = await handleRequest({ endpoint: 'users' });
        const userDB = users.find((usr: { uid: string }) => usr.uid === u.uid);
        setUser(userDB ? { ...userDB, isLoggedIn: true } : { uid: u.uid, isLoggedIn: true });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
