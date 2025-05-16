'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Check, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ProductCard2Props {
  product: {
    _id: string;
    name: string;
    caption: string;
    categoryId: string;
    mainImage: string;
    slug: string;
    originalPrice: number;
    discountPrice: number;
  };
}

const ProductCard2 = ({ product }: ProductCard2Props) => {
  const { _id, wishlist, addToWishlist, removeFromWishlist } = useUserStore();

  const handleClick = async (productId: string) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    toast.promise(
      async () => {
        await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { wishlist: useUserStore.getState().wishlist } });
      },
      {
        loading: 'Updating wishlist...',
        success: 'Wishlist updated',
        error: () => {
          if (wishlist.includes(productId)) {
            removeFromWishlist(productId);
          } else {
            addToWishlist(productId);
          }
          return 'Failed to update wishlist';
        },
      },
      {
        id: 'wishlist',
        position: 'bottom-right',
      }
    );
  };

  return (
    <div className='w-72 h-full flex flex-col items-start justify-start gap-3 rounded-lg overflow-hidden relative bg-[#f6f6f6]'>
      <div className='w-full flex items-center justify-between'>
        <p className='px-6 py-2 bg-orange-500 text-white rounded-br-lg text-xs'>Popular</p>
        {product.categoryId == '67b599807ada422f91956cfc' && <p className='px-6 py-2 bg-gradient-to-r from-[#36c057] to-[#10cc78] text-white rounded-bl-lg text-xs'>Organic</p>}
      </div>
      <Image src={product.mainImage} alt={product.name} width={400} height={400} className='w-[200px] mx-auto flex-1 aspect-square object-cover' priority />
      <div className='w-full p-2 space-y-2'>
        <Link href={`/products/${product.slug}`}>
          <p className='text-lg font-semibold text-primary'>{product.name}</p>
        </Link>
        <div className='w-full flex items-center justify-between gap-2'>
          <p className='text-nowrap text-[#156c56] text-lg font-semibold'>&#8377; {product.discountPrice || product.originalPrice}</p>
          <div className='size-10 bg-[#156c56] p-1 rounded-full flex items-center justify-center cursor-pointer relative' onClick={() => handleClick(product._id)}>
            <Plus
              size={24}
              className={`text-white ${
                wishlist.includes(product._id) ? 'scale-0 -rotate-180' : 'scale-100 rotate-0'
              } duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              strokeWidth={2}
            />
            <Check
              size={24}
              className={`text-white ${
                wishlist.includes(product._id) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              } duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
