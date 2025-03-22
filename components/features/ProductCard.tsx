'use client';

import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ProductCardProps {
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

const ProductCard = ({ product }: ProductCardProps) => {
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
    <div className='w-48 sm:w-64 h-full mx-auto flex flex-col items-start justify-between gap-0.5 rounded-lg overflow-hidden relative group'>
      <Heart
        className={`size-6 absolute top-2 right-2 text-red-500 stroke-1 scale-0 group-hover:scale-100 duration-100 ${wishlist.includes(product._id) ? 'fill-red-500' : ''}`}
        onClick={() => handleClick(product._id)}
      />
      <div className='w-full aspect-square rounded-lg overflow-clip bg-neutral-100'>
        <Link href={`/products/${product.slug}`} className='w-full h-full flex items-center justify-center'>
          <Image src={product.mainImage} alt={product.name} width={400} height={400} className='w-[80%] aspect-square object-cover hover:scale-110 duration-500' priority />
        </Link>
      </div>
      <div className='w-full space-y-1'>
        <Link href={`/products/${product.slug}`}>
          <p className='text-base text-primary'>{product.name}</p>
        </Link>
        <p className='w-full py-1 text-xs text-muted-foreground truncate'>{product.caption}</p>
      </div>
      <div className='py-2 flex items-center justify-between w-full'>
        <p>&#8377; {product.originalPrice}</p>
        <Link href={`/products/${product.slug}`} className='px-5 py-1.5 bg-orange-400 text-white rounded-lg text-sm'>
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
