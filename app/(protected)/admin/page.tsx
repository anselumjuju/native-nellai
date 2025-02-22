'use client';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import useUserStore from '@/store/userStore';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

const Admin = () => {
  const { name, setUser } = useUserStore();
  const [count, setCount] = useState(0);
  return (
    <div className='flex flex-1 flex-col gap-5 items-center justify-center'>
      <p className='text-base font-semibold'>Admin Dashboard</p>
      <p>{name}</p>
      <Button
        onClick={() => {
          setCount(count + 1);
          setUser({ name: `New Name ${count}` });
        }}>
        Change Name
      </Button>
      <Button onClick={async () => await signOut(auth)}>Logout</Button>
    </div>
  );
};

export default Admin;
