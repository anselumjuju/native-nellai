'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        toast('Please login to continue');
        router.push('/login');
      } else {
        setIsUser(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return isUser && <>{children}</>;
};

export default AuthGuard;
