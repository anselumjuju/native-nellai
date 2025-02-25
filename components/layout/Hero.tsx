import { handleRequest } from '@/lib/serverActions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = async () => {
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });

  if (!productSuccess) return null;

  return (
    <div className='w-full flex flex-col items-start justify-center gap-12'>
      <h1 className='text-3xl font-medium'>Popular Products</h1>
      <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
        {[...products, ...products].map(
          (product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }, i: number) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.slug + i}
              className='w-full max-w-64 h-full mx-auto flex flex-col items-start justify-center gap-0.5 rounded-lg overflow-hidden'>
              <div className='w-full h-64 rounded-lg overflow-hidden'>
                <Image src={product.mainImage} alt={product.name} width={400} height={400} className='w-full h-64 object-cover rounded-lg hover:scale-110 duration-500' />
              </div>
              <p className='text-base text-primary'>{product.name}</p>
              <p className='py-1 text-xs text-muted-foreground line-clamp-1'>{product.caption}</p>
              <div className='py-2 flex items-center justify-between w-full'>
                <p>&#8377; {product.originalPrice}</p>
                <Button variant={'default'} className='' size={'sm'}>
                  Buy Now
                </Button>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
