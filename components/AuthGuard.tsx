'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/authStore';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore.getState();

  useEffect(() => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      toast.error('You are not logged in', { id: 'not-logged-in' });
      router.push('/login');
      return;
    }

    const unsubscribe = useAuthStore.subscribe((state) => {
      if (!state.isAuthenticated) {
        toast.error('You are not logged in', { id: 'not-logged-in' });
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
