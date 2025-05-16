'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ProductCard1Props {
  product: {
    _id: string;
    name: string;
    caption: string;
    mainImage: string;
    slug: string;
    originalPrice: number;
    discountPrice: number;
  };
}

const ProductCard1 = ({ product }: ProductCard1Props) => {
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
    <div className='w-72 h-full p-2 flex flex-col items-start justify-start gap-3 rounded-lg overflow-hidden relative border'>
      <div className='w-full flex items-center justify-between'>
        <p className='px-3 py-1.5 bg-[#156c56] text-white rounded-lg text-xs'>Popular</p>
        <Heart
          className={`size-6 text-red-500 stroke-1 cursor-pointer hover:scale-110 hover:animate-spin duration-300 ${wishlist.includes(product._id) ? 'fill-red-500' : ''}`}
          onClick={() => handleClick(product._id)}
        />
      </div>
      <Image src={product.mainImage} alt={product.name} width={400} height={400} className='w-[200px] mx-auto aspect-square object-cover' priority />
      <div className='w-full space-y-0.5'>
        <Link href={`/products/${product.slug}`}>
          <p className='text-lg font-semibold text-primary'>{product.name}</p>
        </Link>
        <p className='w-full py-1 text-xs text-muted-foreground truncate'>{product.caption}</p>
      </div>
      <div className='w-full mt-auto flex flex-col items-start justify-between gap-2'>
        <p>&#8377; {product.discountPrice || product.originalPrice}</p>
        <Link href={`/products/${product.slug}`} className='w-full px-5 py-2.5 bg-[#156c56] text-white text-center rounded-md text-sm font-light'>
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard1;
