'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartCard = ({ mainImage, name, price, quantity, productId }: { mainImage: string; name: string; price: number; quantity: number; productId: string }) => {
  const { _id, addToCart, cart, reduceFromCart } = useUserStore();
  const [cartCount, setCartCount] = useState(cart.find((item) => item.productId === productId)?.quantity || 0);

  const handleAddToCart = async () => {
    addToCart(productId, 1);
    toast.promise(
      async () => {
        await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { cart: useUserStore.getState().cart } });
      },
      {
        loading: 'Adding to cart...',
        success: 'Added to cart',
        error: 'Failed to add to cart',
      },
      {
        id: 'cart',
        position: 'bottom-right',
      }
    );
  };

  const handleReduceFromCart = async () => {
    reduceFromCart(productId);
    toast.promise(
      async () => {
        await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { cart: useUserStore.getState().cart } });
      },
      {
        loading: 'Removing from cart...',
        success: 'Removed from cart',
        error: 'Failed to remove from cart',
      },
      {
        id: 'cart',
        position: 'bottom-right',
      }
    );
  };

  useEffect(() => {
    setCartCount(cart.find((item) => item.productId === productId)?.quantity || 0);
  }, [cart]);

  return (
    <div className='flex items-stretch md:items-center justify-between'>
      <div className='flex items-center justify-start gap-4'>
        <Image src={mainImage || 'https://placehold.co/400/png'} alt={'name'} width={64} height={64} className='size-20 rounded-md object-cover' />
        <p className='w-[15ch] text-base line-clamp-2'>{name}</p>
      </div>
      <p className='hidden lg:block'>Rs. {price * cartCount}</p>
      <div className='flex items-end justify-start gap-3 flex-col'>
        <p className='lg:hidden'>Rs. {price * cartCount}</p>
        <div className='flex items-center justify-center gap-4'>
          <Minus
            className='size-6 p-1 text-neutral-500 border rounded-full border-neutral-500 cursor-pointer hover:scale-105 hover:text-neutral-600 hover:border=neutral-600'
            onClick={handleReduceFromCart}
          />
          <p>{quantity}</p>
          <Plus
            className='size-6 p-1 text-neutral-500 border rounded-full border-neutral-500 cursor-pointer hover:scale-105 hover:text-neutral-600 hover:border=neutral-600'
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
