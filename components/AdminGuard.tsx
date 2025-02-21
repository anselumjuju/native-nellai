'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useUser();

  if (user === undefined) {
    return (
      <div className='w-full h-dvh flex items-center justify-center'>
        <p className='text-lg font-semibold'>Checking permissions...</p>
      </div>
    );
  }

  if (user && user.role !== 'admin') {
    return (
      <div className='w-full px-3 h-dvh flex flex-col items-center justify-center gap-2 lg:gap-4 text-center'>
        <h1 className='text-4xl lg:text-5xl font-bold uppercase'>Access Denied</h1>
        <p className='max-w-[40ch] text-sm text-muted-foreground'>
          Unauthorized access detected. Your account does not have the required privileges to view this content. If you need access, please consult with your system administrator.
        </p>
        <Button onClick={() => router.push('/')} size={'lg'} className='mt-4 text-nowrap'>
          Go to Home
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
