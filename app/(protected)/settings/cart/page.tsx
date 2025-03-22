'use client';

import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartCard from '../ui/CartCard';
import { handleRequest } from '@/lib/serverActions';
import BuyNowModal from '@/components/layout/BuyNowModal';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const { cart } = useUserStore();

  useEffect(() => {
    (async () => {
      const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
      if (!productSuccess) {
        setIsLoading(false);
        return null;
      }
      setProducts(products);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      const currentPrdt = products.find((product: { _id: string }) => product._id === item.productId) as { _id: string; originalPrice: number; discountPrice: number } | undefined;
      if (currentPrdt) {
        newTotal += (currentPrdt.discountPrice || currentPrdt.originalPrice) * item.quantity;
      }
    });
    setTotal(newTotal);
  }, [cart, products]);

  if (isloading) return <div>Loading...</div>;
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
    <div className='size-full flex flex-col items-stretch justify-start gap-6'>
      {cart.map((item) => {
        const currentPrdt = products.find((product: { _id: string }) => product._id === item.productId) as
          | { _id: string; name: string; mainImage: string; originalPrice: number; discountPrice: number }
          | undefined;
        if (currentPrdt == undefined) return null;

        return (
          <div key={item.productId}>
            <CartCard
              name={currentPrdt.name}
              mainImage={currentPrdt.mainImage}
              price={currentPrdt.discountPrice || currentPrdt.originalPrice}
              quantity={item.quantity}
              productId={item.productId}
            />
          </div>
        );
      })}
      <div className='w-full pt-4 flex items-center justify-end gap-6'>
        <div className='flex flex-row items-center justify-end gap-4'>
          <h1 className='text-base'>
            Total: <span className='text-lg font-semibold'>{total}</span>
          </h1>
        </div>
        <BuyNowModal products={products} total={total} />
      </div>
    </div>
  );
};

export default Cart;
