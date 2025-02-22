'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthStore from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { auth } from '@/lib/firebase';
import { handleRequest } from '@/lib/serverActions';

const AuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const { login, logout } = useAuthStore.getState();
      const { setUser, clearUser } = useUserStore.getState();
      if (user) {
        login(user.uid);

        try {
          const { data: usersData } = await handleRequest({ endpoint: 'users' });
          const userData = usersData.find((u: { uid: string }) => u.uid === user.uid);
          setUser({ _id: userData._id, name: userData.name, email: userData.email, phone: userData.phone, profilePic: userData.profilePic, role: userData.role });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        logout();
        clearUser();
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default AuthListener;
