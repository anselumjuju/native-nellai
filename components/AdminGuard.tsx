'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import useUserStore from '@/store/userStore';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const currentRole = useUserStore.getState().role;
    setIsAdmin(currentRole === 'admin');

    const unsubscribe = useUserStore.subscribe((state) => {
      setIsAdmin(state.role === 'admin');
    });

    return () => unsubscribe();
  }, []);

  if (!isAdmin) {
    return (
      <div className='w-full px-3 h-dvh flex flex-col items-center justify-center gap-2 lg:gap-4 text-center'>
        <h1 className='text-4xl lg:text-5xl font-bold uppercase'>Access Denied</h1>
        <p className='max-w-[40ch] text-sm text-muted-foreground'>
          Unauthorized access detected. Your account does not have the required privileges to view this content. If you need access, please consult with your system administrator.
        </p>
        <Button onClick={() => router.push('/')} size='lg' className='mt-4 text-nowrap'>
          Go to Home
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
export default AdminGuard;
