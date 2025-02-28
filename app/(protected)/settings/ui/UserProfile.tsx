'use client';

import useUserStore from '@/store/userStore';
import Image from 'next/image';

const UserProfile = () => {
  const { name, email, profilePic } = useUserStore();
  return (
    <div className='w-full flex items-end justify-start gap-4'>
      <Image src={profilePic} alt='product' width={400} height={400} className='size-20 rounded-full object-cover' />
      <div className='flex flex-col pb-2 gap-0 items-start justify-end'>
        <p className='text-lg font-normal'>{name}</p>
        <p className='text-sm text-muted-foreground'>{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
