'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BuyNowButton = ({ productId }: { productId: string }) => {
  const { _id, cart, addToCart } = useUserStore();
  const router = useRouter();
  const [isProceeding, setIsProceeding] = useState(false);

  const handleBuyNow = async () => {
    setIsProceeding(true);
    if (!cart.find((item) => item.productId === productId)) {
      addToCart(productId, 1);
      await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { cart: useUserStore.getState().cart } });
    }
    setIsProceeding(false);
    router.push('/settings/cart');
  };

  return (
    <button className={`px-12 py-3 bg-orange-400 text-white text-sm ${isProceeding && 'opacity-50'}`} onClick={handleBuyNow} disabled={isProceeding}>
      {isProceeding ? 'Proceeding...' : 'Buy Now'}
    </button>
  );
};

export default BuyNowButton;
