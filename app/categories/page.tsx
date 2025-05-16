import ProductCard from '@/components/features/ProductCard';
import { handleRequest } from '@/lib/serverActions';

const Categories = async () => {
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });

  if (!productSuccess) return null;
  return (
    <div className='w-full flex flex-col items-center justify-center gap-12'>
      <h1 className='text-3xl font-medium relative after:content-[""] after:h-0.5 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:bg-orange-500'>
        All Categories
      </h1>
      <div className='w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
        {products &&
          products.map((product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }) => (
            <div key={product.slug}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
