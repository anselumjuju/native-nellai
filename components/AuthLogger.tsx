'use client';

import useAuthStore from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { useEffect } from 'react';

const AuthLogger = () => {
  useEffect(() => {
    const authUnsubscribe = useAuthStore.subscribe((state) => console.log('Auth state updated:', state));
    const unsubscribe = useUserStore.subscribe((state) => console.log('User state updated:', state));
    return () => {
      unsubscribe();
      authUnsubscribe();
    };
  }, []);

  return null;
};

export default AuthLogger;
