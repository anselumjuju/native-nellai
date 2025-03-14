'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartButton = ({ productId }: { productId: string }) => {
  const { _id, addToCart, cart, reduceFromCart } = useUserStore();
  const [cartCount, setCartCount] = useState(cart.find((item) => item.productId === productId)?.quantity || 0);

  const handleAddToCart = async () => {
    addToCart(productId, 1);
    toast.promise(
      async () => {
        const formData = new FormData();
        formData.append('cart', JSON.stringify(cart));
        await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: formData });
      },
      {
        loading: 'Adding to cart...',
        success: () => {
          return 'Added to cart';
        },
        error: 'Failed to add to cart',
      },
      {
        position: 'bottom-right',
      }
    );
  };

  useEffect(() => {
    setCartCount(cart.find((item) => item.productId === productId)?.quantity || 0);
  }, [cart]);

  return cartCount <= 0 ? (
    <button className='px-12 py-3 bg-neutral-200 text-primary text-sm' onClick={handleAddToCart}>
      Add to Cart
    </button>
  ) : (
    <div className='px-3 py-3 bg-neutral-200 text-primary flex items-center justify-between gap-6'>
      <Minus
        className='w-6 text-neutral-900 cursor-pointer'
        onClick={() => {
          reduceFromCart(productId);
        }}
      />
      <p className='text-lg'>{cartCount}</p>
      <Plus className='w-6 text-neutral-900 cursor-pointer' onClick={handleAddToCart} />
    </div>
  );
};

export default CartButton;
