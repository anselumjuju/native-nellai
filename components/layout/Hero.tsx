import { handleRequest } from '@/lib/serverActions';
import ProductCard from '../features/ProductCard';

const Hero = async () => {
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });

  if (!productSuccess) return null;

  return (
    <div className='w-full flex flex-col items-start justify-center gap-12'>
      <h1 className='text-3xl font-medium'>Popular Products</h1>
      <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
        {[...products, ...products].map(
          (product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }, i: number) => (
            <div key={product.slug + i}>
              <ProductCard product={product} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
