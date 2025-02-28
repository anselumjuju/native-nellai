'use client';

import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

const WishList = () => {
  const { wishlist } = useUserStore();
  if (!wishlist.length) {
    return (
      <div className='w-full h-[45vh] flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-medium'>No Products in the WishList</h1>
        <Link href='/products'>
          <Button variant={'outline'}>Explore Products</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className='size-full flex items-center justify-start'>
      <h1>WishList</h1>
    </div>
  );
};

export default WishList;
