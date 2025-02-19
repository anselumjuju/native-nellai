'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  uid?: string;
  name?: string;
  email?: string;
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
    console.log('User: \n\n', user);
    if (!user?.uid) console.log('No UID found.');
    else console.log('\n\nUser: \nupdating to DB\n\n', user);
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
