'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { orders } = useUserStore();

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

  if (isloading) return <div>Loading...</div>;
  if (orders.length) {
    return (
      <div className='w-full h-[45vh] flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-medium'>No Products ordered yet!</h1>
        <Link href='/products'>
          <Button variant={'outline'}>Explore Products</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className='size-full flex items-start justify-start flex-col gap-8'>
      {[
        {
          userId: 'abcd1234',
          items: [
            {
              productId: '1212',
              quantity: 1,
            },
            {
              productId: '1717',
              quantity: 4,
            },
          ],
          totalPrice: 2364,
          status: 'shipped',
          paymentStatus: 'paid',
          orderId: 'ddc52442-d302-4e9c-9a09-b51224945544',
        },
        {
          userId: 'xyz9876',
          items: [
            {
              productId: '1414',
              quantity: 4,
            },
            {
              productId: '1616',
              quantity: 2,
            },
            {
              productId: '2020',
              quantity: 4,
            },
          ],
          totalPrice: 844,
          status: 'shipped',
          paymentStatus: 'paid',
          orderId: '3eb73c7d-fee5-468f-89ae-80a4f71170ba',
        },
        {
          userId: 'xyz9876',
          items: [
            {
              productId: '1414',
              quantity: 3,
            },
            {
              productId: '1515',
              quantity: 1,
            },
            {
              productId: '2020',
              quantity: 3,
            },
          ],
          totalPrice: 1038,
          status: 'cancelled',
          paymentStatus: 'paid',
          orderId: '80d6b539-f56b-4d40-94c0-4189237c5074',
        },
      ].map((order, idx) => {
        return (
          <div className='w-full flex flex-col items-start justify-start' key={idx}>
            <div className='w-full flex items-center justify-between gap-6'>
              <div className='w-full flex items-center justify-start'>
                <div className='w-28 flex items-center justify-start'>
                  {order.items.map((item, idx) => (
                    <Image
                      src={`https://placehold.co/400/png?text=${idx + 1}`}
                      alt='product'
                      width={400}
                      height={400}
                      className='size-20 object-cover rounded-full'
                      style={{
                        transform: `translateX(${-70 * idx}px) translateY(${-3 * idx}px)`,
                        zIndex: order.items.length - idx,
                      }}
                    />
                  ))}
                </div>
                {order.items.map((item, idx) => (
                  <p>{item.productId} - </p>
                ))}
              </div>
              <p>Rs.&nbsp;{order.totalPrice}</p>
              <p className={`text-sm text-muted-foreground border rounded-lg px-3 py-1 ${order.status == 'cancelled' && 'border-red-300'}`}>{order.status}</p>
            </div>
            <p className='w-full text-sm text-right'>
              Ordered on <span className='ml-4 text-muted-foreground'>22.03.2025</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
