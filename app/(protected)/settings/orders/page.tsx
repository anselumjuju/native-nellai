'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IOrder {
  _id: string;
  orderId: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  status: string;
  paymentStatus: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  caption: string;
  description: string;
  about: string;
  quantity: string;
  stock: 'available' | 'unavailable';
  category: string;
  location: string;
  originalPrice: number;
  discountPrice: number;
  isBanner: boolean;
  bannerImage?: string;
  reviews?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const { orders: storeOrders } = useUserStore();

  useEffect(() => {
    (async () => {
      const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
      const { data: orders, success: orderSuccess } = await handleRequest({ endpoint: 'orders' });
      if (!productSuccess || !orderSuccess) {
        setIsLoading(false);
        return null;
      }
      setProducts(products);
      setOrders(orders);
      setIsLoading(false);
    })();
  }, []);

  if (isloading) return <div>Loading...</div>;
  if (!storeOrders.length) {
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
    <div className='size-full flex items-start justify-start flex-col'>
      {orders.map((order, idx) => {
        return (
          <div className='w-full py-5 flex flex-col items-start justify-start relative hover:bg-neutral-100/90 transition-all duration-150 cursor-pointer' key={idx}>
            <div className='w-full flex items-center justify-between gap-6'>
              <div className='w-full flex items-center justify-start'>
                <div className='w-36 flex items-center justify-start'>
                  {order.items.slice(0, 3).map((item, idx) => {
                    const currentPrdt: IProduct | undefined = (products as IProduct[]).find((product) => product._id === item.productId);
                    if (!currentPrdt) return null;
                    return (
                      <Image
                        key={idx}
                        src={currentPrdt.mainImage || 'https://placehold.co/400/png'}
                        alt='product'
                        width={400}
                        height={400}
                        className='size-16 p-1 aspect-square object-cover rounded-full bg-neutral-200'
                        style={{
                          transform: `translateX(${-50 * idx}px) translateY(${-2 * idx}px)`,
                          zIndex: order.items.length - idx,
                        }}
                      />
                    );
                  })}
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                  {order.items.map((item, idx) => {
                    const currentPrdt: IProduct | undefined = (products as IProduct[]).find((product) => product._id === item.productId);
                    if (!currentPrdt) return null;
                    return (
                      <p className='text-sm' key={idx}>
                        {currentPrdt.name} -<span className='text-muted-foreground'> {item.quantity}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <p>Rs.&nbsp;{order.totalPrice}</p>
              <p className={`text-sm text-muted-foreground border rounded-lg px-3 py-1 ${order.status == 'cancelled' && 'border-red-300'}`}>{order.status}</p>
            </div>
            <p className='w-full text-sm text-right'>
              Ordered on <span className='ml-1 text-muted-foreground'>{format(new Date(order.createdAt), 'PP')}</span>
            </p>
            <div className='w-full h-0.5 absolute bottom-0 rounded-full bg-muted-foreground/15' />
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
