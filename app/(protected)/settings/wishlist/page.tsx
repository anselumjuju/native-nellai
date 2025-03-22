'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { _id, wishlist, addToWishlist, removeFromWishlist, cart, addToCart } = useUserStore();
  const router = useRouter();
  const [isProceeding, setIsProceeding] = useState(false);

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

  const handleCheckout = async (productId: string) => {
    setIsProceeding(true);
    // Add to cart
    if (!cart.find((item) => item.productId === productId)) {
      addToCart(productId, 1);
      await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { cart: useUserStore.getState().cart } });
    }
    setIsProceeding(false);
    router.push('/settings/cart');
  };

  const handleRemoveWishlist = async (productId: string) => {
    if (isProceeding) return;
    removeFromWishlist(productId);
    toast.promise(
      async () => {
        await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { wishlist: useUserStore.getState().wishlist } });
      },
      {
        loading: 'Updating wishlist...',
        success: 'Wishlist updated',
        error: () => {
          addToWishlist(productId);
          return 'Failed to update wishlist';
        },
      },
      {
        id: 'wishlist',
        position: 'bottom-right',
      }
    );
  };

  if (isloading) return <div>Loading...</div>;
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
    <div className='size-full grid grid-cols-1 gap-x-6 gap-y-8'>
      {wishlist.map((item: string) => {
        const currentPrdt = products.find((product: { _id: string }) => product._id === item) as
          | { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }
          | undefined;
        if (currentPrdt == undefined) return null;
        return (
          currentPrdt && (
            <div key={currentPrdt.slug} className='w-full h-full flex items-center justify-between gap-4'>
              <div className='flex items-center justify-start gap-4'>
                <Image
                  src={currentPrdt.mainImage || 'https://placehold.co/400/png'}
                  alt={'name'}
                  width={64}
                  height={64}
                  className='size-20 p-2 rounded-md object-cover bg-neutral-300'
                />
                <p className='w-[20ch] text-base line-clamp-2'>{currentPrdt.name}</p>
              </div>
              <div className='flex items-center justify-start gap-8'>
                <button className={`px-4 py-2 bg-orange-500 text-white ${isProceeding && 'opacity-50'}`} onClick={() => handleCheckout(currentPrdt._id)} disabled={isProceeding}>
                  Checkout
                </button>
                <Trash2
                  className={`size-6 text-neutral-500 hover:scale-105 hover:text-red-500 duration-300 cursor-pointer ${isProceeding && 'opacity-50'}`}
                  onClick={() => handleRemoveWishlist(currentPrdt._id)}
                />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default WishList;
