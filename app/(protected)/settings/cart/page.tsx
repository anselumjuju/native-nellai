'use client';

import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

const Cart = () => {
  const { cart } = useUserStore();
  if (!cart.length) {
    return (
      <div className='w-full h-[45vh] flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-medium'>No Products in the Cart</h1>
        <Link href='/products'>
          <Button variant={'outline'}>Explore Products</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className='size-full flex items-center justify-start'>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
